import { Button } from '../../elements/buttons/button';
import ImageContactUs from '../../assets/image/contact-us.svg';

function ContactUs() {
    return (
        <section className="flex flex-col items-center gap-0 px-0 py-20 w-full" id="contactUs">
            <div className="flex flex-col items-center gap-2 w-full">
                <img
                    className="w-20 h-18"
                    alt="Contact icon"
                    src={ImageContactUs}
                />

                <h2 className="w-full font-ib-1 font-extrabold text-black text-5xl text-center tracking-[0] leading-14">
                    Contact us
                </h2>

                <p className="w-full font-ib-1 font-medium text-black text-lg text-center tracking-[0] leading-8">
                    We can help you&nbsp;&nbsp;- guide, some question...
                </p>

                <Button className="inline-flex cursor-pointer gap-3 px-6 py-3 bg-[#ff6f61] items-center justify-center relative h-auto rounded-full hover:bg-[#ff6f61]/90 transition-colors">
                    <span className="relative flex items-center justify-center text-white">
                        Contact Us
                    </span>
                </Button>
            </div>
        </section>
    );
};

export default ContactUs;
