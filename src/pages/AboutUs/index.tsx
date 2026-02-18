import GoogleMapView from '../../components/GoogleMapView';
import ImageAboutUs from '../../assets/image/aboutus.png';

function AboutUs() {
  const handelScrollTop = () => {
    window.scrollTo(0, 0);
  }

  return (
    <div className="pt-30 pb-20" onLoad={handelScrollTop}>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="w-full max-w-5xl">
          <h1 className="mb-4 text-2xl font-semibold">
            About Us
          </h1>
          <div className="flex flex-col gap-6">
            <div className="">
              <GoogleMapView />
              <h6 className="font-bold mt-1">218 New Neely Ferry RdMauldin, SC 29680</h6>
            </div>
            <div className="flex flex-col md:flex-row gap-20">
              <div className="py-2 flex-1 cursor-pointer hover:scale-105 transition-all">
                <img src={ImageAboutUs} alt="" />
              </div>
              <div className="py-2 flex-1 text-black flex flex-col gap-6">
                <h5 className="font-medium">
                  At iJOURNEY, RIZE Prevention’s program, we believe everyone deserves the chance to understand themselves and move toward a future filled with purpose.
                  Our program was created to offer thoughtful guidance, emotional support, and practical tools that help individuals of all ages connect with their values,
                  strengths, and goals.
                  From our home in Mauldin, South Carolina, we're proud to serve people seeking growth, healing, or direction.
                </h5>

                <h5>
                  <span className="font-bold text-ib-1">You'll find our team at:</span><br />
                  <span>218 New Neely Ferry Rd</span>
                  <span>Mauldin, SC 29680</span>
                </h5>

                <h5 className="font-bold italic">
                  Together, let's discover the purpose that's been within you all along.
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutUs