import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function PersonalAndBusinessSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-[#2a3f52] via-[#1a5a6f] to-[#0da9e4] overflow-visible">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Business Insurance */}
        <div className="mb-32">
          <div className="bg-white rounded-2xl shadow-2xl overflow-visible relative">
            <div className="grid lg:grid-cols-2 gap-0 items-center">
              {/* Image - Left */}
              <div className="hidden lg:block relative h-[500px] lg:h-[700px] lg:-mt-20">
                <Image
                  src="/agents/full/justin.png"
                  alt="Business Insurance"
                  fill
                  className="object-cover object-top rounded-l-2xl"
                />
              </div>

              {/* Content - Right */}
              <div className="p-8 lg:p-12">
                <div className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-6">
                  For Your Business
                </div>
                
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  Business Insurance
                </h2>
                
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Protect your business with comprehensive coverage tailored to your industry. 
                  From general liability to workers compensation, we've got you covered.
                </p>

                {/* How It Works */}
                <div className="mb-8 space-y-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">How It Works</h3>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                      1
                    </div>
                    <div>
                      <p className="text-gray-700">Tell us about your business</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                      2
                    </div>
                    <div>
                      <p className="text-gray-700">We find the best coverage options</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                      3
                    </div>
                    <div>
                      <p className="text-gray-700">Get protected in minutes</p>
                    </div>
                  </div>
                </div>

                <Button 
                  asChild 
                  size="lg" 
                  className="w-full lg:w-auto text-lg px-10 py-6 bg-primary hover:bg-primary/90 text-white shadow-lg"
                >
                  <Link href="/business/form">Get Started</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Personal Insurance */}
        <div>
          <div className="bg-white rounded-2xl shadow-2xl overflow-visible relative">
            <div className="grid lg:grid-cols-2 gap-0 items-center">
              {/* Content - Left */}
              <div className="p-8 lg:p-12 order-2 lg:order-1">
                <div className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-6">
                  For You & Your Family
                </div>
                
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  Personal Insurance
                </h2>
                
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Safeguard what matters most with personalized coverage for your home, auto, and life. 
                  We make protecting your family simple and affordable.
                </p>

                {/* How It Works */}
                <div className="mb-8 space-y-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">How It Works</h3>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                      1
                    </div>
                    <div>
                      <p className="text-gray-700">Share your coverage needs</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                      2
                    </div>
                    <div>
                      <p className="text-gray-700">Compare quotes from top carriers</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                      3
                    </div>
                    <div>
                      <p className="text-gray-700">Enjoy peace of mind</p>
                    </div>
                  </div>
                </div>

                <Button 
                  asChild 
                  size="lg" 
                  className="w-full lg:w-auto text-lg px-10 py-6 bg-primary hover:bg-primary/90 text-white shadow-lg"
                >
                  <Link href="/personal">Get Started</Link>
                </Button>
              </div>

              {/* Image - Right */}
              <div className="hidden lg:block relative h-[500px] lg:h-[700px] lg:-mt-20 order-1 lg:order-2">
                <Image
                  src="/agents/full/oraib.png"
                  alt="Personal Insurance"
                  fill
                  className="object-cover object-top rounded-r-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
