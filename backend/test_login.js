#!/usr/bin/env node

/**
 * Login Test Script
 * Tests the authentication flow without needing a browser
 */

require('dotenv').config();
const axios = require('axios');

const API_URL = process.env.API_URL || 'http://localhost:5000/api';

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

const log = {
  info: (msg) => console.log(`${colors.blue}ℹ️  ${msg}${colors.reset}`),
  success: (msg) => console.log(`${colors.green}✅ ${msg}${colors.reset}`),
  error: (msg) => console.log(`${colors.red}❌ ${msg}${colors.reset}`),
  warning: (msg) => console.log(`${colors.yellow}⚠️  ${msg}${colors.reset}`),
  header: (msg) => console.log(`\n${colors.cyan}${colors.bright}${msg}${colors.reset}`),
};

async function testLogin() {
  log.header('🔐 GrabGrid Login Test Suite');

  // Test credentials
  const testUser = {
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123',
    hostelBlock: 'A',
    roomNumber: '101',
    phoneNumber: '9876543210',
  };

  try {
    // Step 1: Check server health
    log.header('Step 1: Checking Server Health');
    try {
      const healthResponse = await axios.get(`${API_URL}/health`);
      log.success('Backend is running');
      log.info(`MongoDB: ${healthResponse.data.mongodb}`);

      if (healthResponse.data.mongodb === 'Disconnected') {
        log.error('MongoDB is not connected - start MongoDB before testing');
        process.exit(1);
      }
    } catch (error) {
      log.error('Backend server is not running');
      log.info(`Make sure backend is running: cd backend && npm run dev`);
      process.exit(1);
    }

    // Step 2: Register test user
    log.header('Step 2: Registering Test User');
    let registerResponse;
    try {
      registerResponse = await axios.post(`${API_URL}/auth/register`, testUser);
      log.success('User registered successfully');
      log.info(`User ID: ${registerResponse.data.user.id}`);
      log.info(`Email: ${registerResponse.data.user.email}`);
    } catch (error) {
      if (error.response?.status === 400 && error.response?.data?.message === 'User already exists') {
        log.info('User already exists, proceeding with login test');
      } else {
        log.error(`Registration failed: ${error.response?.data?.message || error.message}`);
        process.exit(1);
      }
    }

    // Step 3: Test login
    log.header('Step 3: Testing Login');
    let loginResponse;
    try {
      loginResponse = await axios.post(`${API_URL}/auth/login`, {
        email: testUser.email,
        password: testUser.password,
      });

      log.success('Login successful! 🎉');
      log.info(`User: ${loginResponse.data.user.name}`);
      log.info(`Email: ${loginResponse.data.user.email}`);
      log.info(`Access Token: ${loginResponse.data.accessToken.substring(0, 20)}...`);
      log.info(`Refresh Token: ${loginResponse.data.refreshToken.substring(0, 20)}...`);
    } catch (error) {
      if (error.response?.status === 400) {
        log.error(`Login failed: ${error.response.data.message}`);
        log.warning('Verify email and password are correct');
      } else {
        log.error(`Login error: ${error.message}`);
      }
      process.exit(1);
    }

    // Step 4: Test protected endpoint (get profile)
    log.header('Step 4: Testing Protected Endpoint (Get Profile)');
    try {
      const profileResponse = await axios.get(`${API_URL}/auth/profile`, {
        headers: {
          Authorization: `Bearer ${loginResponse.data.accessToken}`,
        },
      });
      log.success('Protected endpoint accessible');
      log.info(`Profile Name: ${profileResponse.data.name}`);
      log.info(`Hostel Block: ${profileResponse.data.hostelBlock}`);
      log.info(`Room: ${profileResponse.data.roomNumber}`);
    } catch (error) {
      if (error.response?.status === 401) {
        log.error('Unauthorized: Token validation failed');
      } else {
        log.error(`Profile fetch failed: ${error.message}`);
      }
      process.exit(1);
    }

    // Step 5: Summary
    log.header('✨ All Tests Passed!');
    log.success('Login system is working correctly');
    log.info('You can now use the frontend to log in');
    log.info(`\nTest User Credentials:`);
    log.info(`  Email: ${testUser.email}`);
    log.info(`  Password: ${testUser.password}`);

  } catch (error) {
    log.error(`Unexpected error: ${error.message}`);
    process.exit(1);
  }
}

// Run tests
testLogin();
