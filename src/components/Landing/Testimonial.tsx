import { ArrowRightIcon } from 'lucide-react';

import { 
    Avatar, 
    AvatarImage, 
    Button, 
    Card, 
    CardContent 
} from '../../elements';

const testimonials = [
    {
        stars: "https://c.animaapp.com/mhbcp5dpMwJOg8/img/stars.svg",
        text: "The Path to Purpose looks at how children are hampered in their search for meaning, and how concerned adults can help them find it.",
        avatar: "https://c.animaapp.com/mhbcp5dpMwJOg8/img/ellipse-2.png",
        name: "Regina Miles",
        role: "Student",
    },
    {
        stars: "https://c.animaapp.com/mhbcp5dpMwJOg8/img/stars.svg",
        text: "The Path to Purpose looks at how children are hampered in their search for meaning, and how concerned adults can help them find it.",
        avatar: "https://c.animaapp.com/mhbcp5dpMwJOg8/img/ellipse-2-1.png",
        name: "Regina Miles",
        role: "Student",
    },
    {
        stars: "https://c.animaapp.com/mhbcp5dpMwJOg8/img/stars.svg",
        text: "The Path to Purpose looks at how children are hampered in their search for meaning, and how concerned adults can help them find it.",
        avatar: "https://c.animaapp.com/mhbcp5dpMwJOg8/img/ellipse-2-2.png",
        name: "Regina Miles",
        role: "Student",
    },
    {
        stars: "https://c.animaapp.com/mhbcp5dpMwJOg8/img/stars.svg",
        text: "The Path to Purpose looks at how children are hampered in their search for meaning, and how concerned adults can help them find it.",
        avatar: "https://c.animaapp.com/mhbcp5dpMwJOg8/img/ellipse-2-3.png",
        name: "Regina Miles",
        role: "Student",
    },
    {
        stars: "https://c.animaapp.com/mhbcp5dpMwJOg8/img/stars.svg",
        text: "The Path to Purpose looks at how children are hampered in their search for meaning, and how concerned adults can help them find it.",
        avatar: "https://c.animaapp.com/mhbcp5dpMwJOg8/img/ellipse-2-4.png",
        name: "Regina Miles",
        role: "Student",
    },
    {
        stars: "https://c.animaapp.com/mhbcp5dpMwJOg8/img/stars.svg",
        text: "The Path to Purpose looks at how children are hampered in their search for meaning, and how concerned adults can help them find it.",
        avatar: "https://c.animaapp.com/mhbcp5dpMwJOg8/img/ellipse-2-5.png",
        name: "Regina Miles",
        role: "Student",
    },
];

function Testimonial() {
    return (
        <section className="w-full bg-white py-12 lg:py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                <div className="flex justify-center">
                    <div className="relative items-center text-white">
                        <div className="flex items-center justify-center gap-3 p-5 relative bg-[#2ecc7199] rounded-tap border-2 border-solid border-[#5ee088]">
                            <div className="uppercase relative flex items-center font-bold justify-center flex-1 font-ib-3 text-[14px] tracking-[1.2px] leading-normal">
                                Testimonial
                            </div>
                        </div>
                    </div>
                </div>
                <h2 className="max-w-2xl mx-auto font-bold text-[#3498db] text-3xl sm:text-4xl lg:text-5xl text-center uppercase">
                    Our happy students say about us
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <Card
                            key={index}
                            className="bg-light-background rounded-lg border border-[#dedede] hover:shadow-lg transition-shadow"
                        >
                            <CardContent className="p-6 sm:p-8 space-y-5">
                                <img
                                    className="w-28 h-6"
                                    alt="5 stars rating"
                                    src={testimonial.stars}
                                />
                                <p className="text-second-text-color font-h-6 leading-relaxed">
                                    {testimonial.text}
                                </p>
                                <div className="flex items-center gap-4">
                                    <Avatar className="w-12 h-12">
                                        <AvatarImage
                                            src={testimonial.avatar}
                                            alt={testimonial.name}
                                            className="object-cover"
                                        />
                                    </Avatar>
                                    <div>
                                        <p className="font-link text-primary-color font-semibold">
                                            {testimonial.name}
                                        </p>
                                        <p className="text-text-color font-h-6 text-sm">
                                            {testimonial.role}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                <div className="flex justify-center text-white">
                    <Button className="inline-flex cursor-pointer gap-4 px-6 py-3 bg-[#ff6f61] items-center justify-center relative h-auto rounded-full hover:bg-[#ff6f61]/80 transition-colors">
                        <span className="relative flex items-center justify-center font-ib-3 font-subheading-as-typed-s5 text-[16px] font-medium tracking-[1.2px]">
                            More Reviews
                        </span>
                        <div className="inline-flex gap-3 p-2 items-center justify-center relative border rounded-full bg-white">
                            <ArrowRightIcon className="relative w-10 h-10 text-[#ff6f61]" />
                        </div>
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default Testimonial;