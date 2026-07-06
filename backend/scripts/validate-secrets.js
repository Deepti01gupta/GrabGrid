#!/usr/bin/env node

/**
 * GrabGrid Security Validator
 * 
 * Validates that:
 * 1. All required environment variables are set
 * 2. Secrets meet minimum security requirements
 * 3. No hardcoded secrets exist in the codebase
 * 4. .env file is not committed to git
 * 
 * Usage:
 *   node scripts/validate-secrets.js
 *   npm run validate-secrets
 */

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

const log = {
  success: (msg) => console.log(`${colors.green}✅ ${msg}${colors.reset}`),
  error: (msg) => console.log(`${colors.red}❌ ${msg}${colors.reset}`),
  warning: (msg) => console.log(`${colors.yellow}⚠️  ${msg}${colors.reset}`),
  info: (msg) => console.log(`${colors.blue}ℹ️  ${msg}${colors.reset}`),
  header: (msg) => console.log(`\n${colors.cyan}${colors.bold}${msg}${colors.reset}\n`),
};

let validationPassed = true;

// ============================================
// 1. Check Required Environment Variables
// ============================================
console.log('\n' + '='.repeat(60));
console.log('🔒 GrabGrid Security Validator');
console.log('='.repeat(60));

log.header('1️⃣  Checking Required Environment Variables');

const requiredVars = [
  {
    name: 'MONGODB_URI',
    description: 'MongoDB connection string',
    check: (val) => val.includes('mongodb'),
  },
  {
    name: 'JWT_SECRET',
    description: 'JWT signing secret',
    check: (val) => val.length >= 32,
  },
  {
    name: 'PORT',
    description: 'Server port',
    check: (val) => !isNaN(parseInt(val)),
  },
];

requiredVars.forEach((variable) => {
  const value = process.env[variable.name];
  
  if (!value) {
    log.error(`Missing: ${variable.name} - ${variable.description}`);
    validationPassed = false;
    return;
  }

  if (!variable.check(value)) {
    log.error(`Invalid: ${variable.name} - ${variable.description}`);
    validationPassed = false;
    return;
  }

  // Mask the actual value for display
  let displayValue = value;
  if (variable.name === 'MONGODB_URI') {
    displayValue = value.replace(/:[^:]*@/, ':***@');
  } else if (variable.name === 'JWT_SECRET') {
    displayValue = value.substring(0, 6) + '***' + value.substring(value.length - 6);
  }

  log.success(`${variable.name} - ${displayValue}`);
});

// ============================================
// 2. Validate Secret Strength
// ============================================
log.header('2️⃣  Validating Secret Strength');

const jwtSecret = process.env.JWT_SECRET;
if (jwtSecret) {
  if (jwtSecret.length >= 32) {
    log.success(`JWT_SECRET is ${jwtSecret.length} characters (minimum 32)`);
  } else {
    log.error(`JWT_SECRET is too short: ${jwtSecret.length} chars (minimum 32 required)`);
    validationPassed = false;
  }

  // Check for common weak patterns
  const weakPatterns = ['password', 'secret123', 'admin', '12345'];
  if (weakPatterns.some((pattern) => jwtSecret.toLowerCase().includes(pattern))) {
    log.warning('JWT_SECRET contains common weak patterns. Consider regenerating.');
  } else {
    log.success('JWT_SECRET passes strength check');
  }
}

// ============================================
// 3. Check for Hardcoded Secrets in Code
// ============================================
log.header('3️⃣  Scanning for Hardcoded Secrets');

const filesToCheck = [
  'server.js',
  'config/db.js',
  'middleware/*.js',
  'controllers/*.js',
  'services/*.js',
];

const secretPatterns = [
  /mongodb\+srv:\/\/[^:]*:[^@]*@/gi,
  /mongodb:\/\/[^:]*:[^@]*@/gi,
  /jwt_secret\s*=\s*['"]/gi,
  /password\s*:\s*['"]/gi,
  /api_key\s*=\s*['"][^'"]{20,}['"]/gi,
];

let hardcodedSecretsFound = false;

try {
  const output = execSync('grep -r "mongodb+srv\\|password\\|api_key\\|JWT_SECRET\\|secret" . --include="*.js" --exclude-dir=node_modules --exclude-dir=.git 2>/dev/null || echo ""')
    .toString()
    .split('\n')
    .filter((line) => line && !line.includes('process.env') && !line.includes('// ') && !line.includes('.env'));

  if (output.length > 0) {
    output.slice(0, 5).forEach((line) => {
      if (line.includes('password') || line.includes('mongodb+srv')) {
        log.warning(`Possible hardcoded secret found: ${line.substring(0, 80)}`);
        hardcodedSecretsFound = true;
      }
    });
    
    if (hardcodedSecretsFound) {
      log.error('Hardcoded secrets detected in code!');
      validationPassed = false;
    }
  } else {
    log.success('No hardcoded secrets found in code');
  }
} catch (error) {
  log.info('Grep not available, skipping code scan');
}

// ============================================
// 4. Check if .env is Committed to Git
// ============================================
log.header('4️⃣  Checking Git History for .env');

try {
  const gitOutput = execSync('git ls-files .env 2>/dev/null || echo ""').toString();
  if (gitOutput.includes('.env')) {
    log.error('.env file is tracked in git! Remove it immediately:');
    console.log(`    git rm --cached .env`);
    console.log(`    git filter-repo --invert-paths --path .env`);
    console.log(`    git push origin --force-all`);
    validationPassed = false;
  } else {
    log.success('.env is not tracked in git');
  }
} catch (error) {
  log.info('Git check skipped');
}

// ============================================
// 5. Verify .gitignore Configuration
// ============================================
log.header('5️⃣  Checking .gitignore');

try {
  const gitignoreContent = fs.readFileSync('.gitignore', 'utf8');
  const hasEnvIgnore = gitignoreContent.includes('.env');
  
  if (hasEnvIgnore) {
    log.success('.env is properly ignored in .gitignore');
  } else {
    log.warning('.env rule not found in .gitignore');
  }
} catch (error) {
  log.warning('.gitignore not found');
}

// ============================================
// 6. MongoDB Connection Test
// ============================================
log.header('6️⃣  Testing MongoDB Connection');

if (process.env.MONGODB_URI) {
  try {
    const mongoose = require('mongoose');
    
    mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 10000,
    });

    mongoose.connection.on('connected', () => {
      log.success('✓ MongoDB connection successful');
      
      mongoose.connection.close();
      printSummary();
    });

    mongoose.connection.on('error', (err) => {
      log.error(`MongoDB connection failed: ${err.message}`);
      validationPassed = false;
      
      printSummary();
    });

    // Timeout
    setTimeout(() => {
      log.error('MongoDB connection timeout');
      mongoose.connection.close();
      validationPassed = false;
      
      printSummary();
    }, 10000);
  } catch (error) {
    log.warning('Could not load mongoose: ' + error.message);
    printSummary();
  }
} else {
  log.warning('MONGODB_URI not set, skipping connection test');
  printSummary();
}

// ============================================
// Summary
// ============================================
function printSummary() {
  console.log('\n' + '='.repeat(60));
  if (validationPassed) {
    console.log(`${colors.green}✅ ALL SECURITY CHECKS PASSED${colors.reset}`);
  } else {
    console.log(`${colors.red}❌ SECURITY VALIDATION FAILED${colors.reset}`);
    console.log(`\n${colors.yellow}Review the errors above and fix them before deploying.${colors.reset}`);
  }
  console.log('='.repeat(60) + '\n');

  process.exit(validationPassed ? 0 : 1);
}
