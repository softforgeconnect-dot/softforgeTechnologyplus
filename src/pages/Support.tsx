import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Support = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-black">
      <Header />
      <main className="pt-16">
        <section className="py-20 gradient-hero">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-hero text-white font-bold mb-6">Support</h1>
            <p className="text-subtitle text-gray-200 max-w-3xl mx-auto">
              We're here to help you reach the stars
            </p>
          </div>
        </section>

        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-foreground mb-8">Need Help?</h2>
              <p className="text-xl text-muted-foreground">
                Support center coming soon. Contact us for immediate assistance!
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Support;