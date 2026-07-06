import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { Button, Card, Badge } from '../components/UI/index';


/**
 * Premium, modern Home page for GrabGrid
 * Employs clean typography, smooth transitions, theme-aware CSS variables, and modern grids.
 */
const Home = () => {
  const { isAuthenticated } = useAuth();


  const categories = [
    { name: 'Books & Notes', icon: '📚', count: '1,240+', desc: 'Textbooks, lab manuals, class notes, and exam prep resources.', color: 'border-l-primary' },
    { name: 'Lab Kits', icon: '🔬', count: '580+', desc: 'Arduino kits, electrical component sets, lab aprons, and lenses.', color: 'border-l-secondary' },
    { name: 'Appliances', icon: '⚡', count: '890+', desc: 'Electric kettles, iron boxes, table fans, extension cords, and lamps.', color: 'border-l-accent' },
    { name: 'Sports Gear', icon: '🏸', count: '420+', desc: 'Cricket bats, badminton rackets, footballs, and table tennis gear.', color: 'border-l-success' },
    { name: 'Electronics', icon: '🎧', count: '1,100+', desc: 'Power banks, Bluetooth speakers, headphones, and laptop chargers.', color: 'border-l-primary' },
    { name: 'Gaming & Media', icon: '🎮', count: '340+', desc: 'VR headsets, gamepads, DSLRs, mini-projectors, and accessories.', color: 'border-l-secondary' },
  ];

  const steps = [
    { num: 1, title: 'Register', desc: 'Sign up with your hostel credentials and complete your profile.' },
    { num: 2, title: 'Browse', desc: 'Search and filter active listings within your hostel block.' },
    { num: 3, title: 'Request', desc: 'Send borrow request to the item owner and specify duration.' },
    { num: 4, title: 'Use & Return', desc: 'Pick up the item, use it, and return it safely by the deadline.' },
    { num: 5, title: 'Rate', desc: 'Build trust by exchanging ratings and positive reviews.' },
  ];

  return (
    <div className="bg-bg text-text-primary min-h-screen transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-br from-primary/10 via-bg to-secondary/5 border-b border-card-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Left */}
            <div className="lg:col-span-7 text-center lg:text-left">
              <Badge variant="primary" className="mb-4 inline-flex px-3 py-1 text-sm bg-primary/15 text-primary border border-primary/20">
                ✨ Sharing Made Smarter
              </Badge>
              <h1 className="font-display text-5xl sm:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
                Welcome to <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">GrabGrid</span>
              </h1>
              <p className="text-xl font-semibold mb-6 text-text-secondary">
                Share Resources, Save Money, Build a Greener Hostel Community.
              </p>
              <p className="text-lg mb-8 text-text-muted max-w-2xl mx-auto lg:mx-0">
                Hostel life is expensive, and temporary items shouldn't drain your budget. Borrow textbooks, lab kits, sports gear, and electronics from your peers at zero rental cost!
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
                {isAuthenticated ? (
                  <>
                    <Link to="/items">
                      <Button variant="primary" size="lg" icon="🔍">
                        Browse Listings
                      </Button>
                    </Link>
                    <Link to="/add-item">
                      <Button variant="outline" size="lg" icon="➕">
                        Share an Item
                      </Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/register">
                      <Button variant="primary" size="lg" icon="🚀">
                        Get Started
                      </Button>
                    </Link>
                    <Link to="/login">
                      <Button variant="ghost" size="lg" icon="🔑">
                        Sign In
                      </Button>
                    </Link>
                  </>
                )}
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-card-border/50 max-w-lg mx-auto lg:mx-0">
                <div>
                  <h4 className="text-3xl font-extrabold text-primary">1k+</h4>
                  <p className="text-sm text-text-secondary mt-1 font-medium">Students</p>
                </div>
                <div>
                  <h4 className="text-3xl font-extrabold text-secondary">5k+</h4>
                  <p className="text-sm text-text-secondary mt-1 font-medium">Items Shared</p>
                </div>
                <div>
                  <h4 className="text-3xl font-extrabold text-success">₹50L+</h4>
                  <p className="text-sm text-text-secondary mt-1 font-medium">Saved</p>
                </div>
              </div>
            </div>

            {/* Hero Right - 3D Floater Graphics */}
            <div className="lg:col-span-5 flex justify-center relative">
              <div className="w-72 h-72 rounded-full bg-primary/20 blur-3xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0" />
              <div className="relative z-10 text-[9rem] sm:text-[11rem] select-none animate-float filter drop-shadow-2xl">
                📚
                <span className="absolute -top-10 -right-8 text-5xl animate-bounce">⚡</span>
                <span className="absolute -bottom-8 -left-8 text-6xl rotate-12">🔬</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="primary" className="mb-2">Categories</Badge>
          <h2 className="font-display text-4xl font-extrabold text-text-primary tracking-tight">
            What Can You Borrow?
          </h2>
          <p className="text-lg text-text-muted mt-3 max-w-2xl mx-auto">
            GrabGrid covers a wide range of essentials. Check out what your hostel community is sharing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat, idx) => (
            <Card 
              key={idx} 
              className={`p-6 border-l-4 ${cat.color} hover:shadow-xl hover:-translate-y-1 duration-300 transition-all`}
            >
              <div className="flex justify-between items-start mb-4">
                <span className="text-4xl">{cat.icon}</span>
                <Badge variant="secondary" className="text-xs">{cat.count}</Badge>
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-2">{cat.name}</h3>
              <p className="text-text-secondary text-sm leading-relaxed">{cat.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-surface/50 border-y border-card-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="success" className="mb-2">Process</Badge>
            <h2 className="font-display text-4xl font-extrabold text-text-primary">
              Simple 5-Step sharing
            </h2>
            <p className="text-lg text-text-muted mt-3 max-w-2xl mx-auto">
              No complex paperwork. Direct, peer-to-peer student resource sharing.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 relative">
            {steps.map((step, idx) => (
              <div key={idx} className="relative flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xl shadow-lg mb-6 relative z-10">
                  {step.num}
                </div>
                <h3 className="text-lg font-bold text-text-primary mb-2">{step.title}</h3>
                <p className="text-sm text-text-secondary max-w-xs leading-relaxed">{step.desc}</p>
                {idx < 4 && (
                  <div className="hidden lg:block absolute top-7 left-[65%] w-full h-[2px] bg-card-border/60 z-0" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Showcase */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="primary" className="mb-2">Key Features</Badge>
          <h2 className="font-display text-4xl font-extrabold text-text-primary">
            Designed for Student Comfort
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { icon: '🔒', title: 'Secure Authentication', desc: 'Secure login validation ensuring your details and listings stay safe.' },
            { icon: '🔍', title: 'Smart Search & Filter', desc: 'Instantly find items by category, condition, block, or room.' },
            { icon: '⏰', title: 'Deadline Tracking', desc: 'Calculates expected return date and helps prevent late returns.' },
            { icon: '💳', title: 'Security Deposits', desc: 'Enable optional, peace-of-mind deposit terms for highly valuable gear.' },
            { icon: '⭐', title: 'Credibility Ratings', desc: 'Build trust inside the campus block by viewing user ratings.' },
            { icon: '🌱', title: 'Eco Sharing Impact', desc: 'Reduce waste and promote eco-friendly reuse of resources.' },
          ].map((feat, idx) => (
            <Card key={idx} className="p-6 flex gap-4 hover:shadow-lg transition-all duration-200">
              <span className="text-3xl flex-shrink-0">{feat.icon}</span>
              <div>
                <h4 className="text-lg font-bold text-text-primary mb-1">{feat.title}</h4>
                <p className="text-sm text-text-secondary leading-relaxed">{feat.desc}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-surface/50 border-t border-card-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-4xl font-extrabold text-center text-text-primary mb-16">
            Student Testimonials
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { text: '"GrabGrid saved me ₹3000 by borrowing engineering lab books instead of buying them new. Highly recommended!"', name: 'Rajesh K.', info: 'Block A, Room 201' },
              { text: '"The borrow flow is smooth. I requested a kettle from the room next door, got approval in minutes and returned it in 2 days."', name: 'Priya Sharma', info: 'Block B, Room 305' },
              { text: '"Finally, I can list my idle accessories and earn points within the block. Excellent app concept!"', name: 'Amit Patel', info: 'Block C, Room 102' }
            ].map((test, idx) => (
              <Card key={idx} className="p-8 border-t-4 border-primary hover:shadow-xl transition-all duration-300">
                <div className="text-xl text-yellow-500 mb-4">⭐⭐⭐⭐⭐</div>
                <p className="text-text-secondary italic mb-6 leading-relaxed">{test.text}</p>
                <h5 className="font-bold text-text-primary">{test.name}</h5>
                <span className="text-xs text-text-muted">{test.info}</span>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary to-secondary text-white border-t border-card-border/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold mb-4">
            Ready to Share & Save?
          </h2>
          <p className="text-xl opacity-90 mb-10 max-w-2xl mx-auto">
            Become a part of your hostel's resource-sharing network. Save money, reduce waste, and connect with peers.
          </p>

          {!isAuthenticated ? (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button variant="accent" size="lg" icon="🚀">
                  Join GrabGrid
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                  Log In
                </Button>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/items">
                <Button variant="accent" size="lg" icon="🔍">
                  Browse Items
                </Button>
              </Link>
              <Link to="/add-item">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                  Share Your Items
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
