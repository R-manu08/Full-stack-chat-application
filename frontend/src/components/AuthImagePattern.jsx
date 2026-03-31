import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const AuthImagePattern = ({title, subtitle}) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const images = [
        {
            title: "Real-time Messaging",
            subtitle: "Chat instantly with friends and get instant responses",
            icon: "💬"
        },
        {
            title: "AI Assistant",
            subtitle: "Get help from Talksy AI for any question you have",
            icon: "🤖"
        },
        {
            title: "Stay Connected",
            subtitle: "Never miss a message with real-time notifications",
            icon: "🔔"
        },
        {
            title: "Easy & Secure",
            subtitle: "Safe, encrypted conversations you can trust",
            icon: "🔐"
        }
    ];

    // Auto-rotate images every 5 seconds
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [images.length]);

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const currentImage = images[currentImageIndex];

    return (
        <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-primary/20 via-base-100 to-primary/10 p-12 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
            </div>

            {/* Content */}
            <div className="max-w-md text-center relative z-10">
                {/* Image Container with Carousel */}
                <div className="mb-8 relative">
                    {/* Main Image/Illustration */}
                    <div className="relative w-64 h-64 mx-auto mb-6 flex items-center justify-center bg-base-200 rounded-2xl overflow-hidden transition-all duration-500">
                        {/* Large Icon */}
                        <div className="text-9xl animate-bounce">{currentImage.icon}</div>
                        
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent"></div>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex items-center justify-between px-2 mb-4">
                        <button
                            onClick={prevImage}
                            className="btn btn-circle btn-sm btn-ghost hover:bg-primary/20"
                            aria-label="Previous image"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        
                        {/* Dot Indicators */}
                        <div className="flex gap-2">
                            {images.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentImageIndex(idx)}
                                    className={`h-2 rounded-full transition-all ${
                                        idx === currentImageIndex
                                            ? "w-8 bg-primary"
                                            : "w-2 bg-primary/30 hover:bg-primary/50"
                                    }`}
                                    aria-label={`Go to image ${idx + 1}`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={nextImage}
                            className="btn btn-circle btn-sm btn-ghost hover:bg-primary/20"
                            aria-label="Next image"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Carousel Image Text */}
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-primary mb-2">{currentImage.title}</h3>
                        <p className="text-sm text-base-content/60">{currentImage.subtitle}</p>
                    </div>
                </div>

                {/* Main Text content */}
                <div className="border-t border-base-300 pt-6">
                    <h2 className="text-2xl font-bold mb-4">{title}</h2>
                    <p className="text-base-content/60">{subtitle}</p>
                </div>

                {/* Bottom decorative dots */}
                <div className="flex justify-center gap-2 mt-8">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <div className="w-2 h-2 rounded-full bg-primary/50"></div>
                    <div className="w-2 h-2 rounded-full bg-primary/30"></div>
                </div>
            </div>
        </div>
    );
};

export default AuthImagePattern