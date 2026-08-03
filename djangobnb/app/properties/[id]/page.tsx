import Image from "next/image";
import ReservationSidebar from "../../components/properties/ReservationSidebar";

const PropertyDetailPage = () => {
  return (
    <main className="max-w-375 mx-auto px-6 pb-6">
      <div className="w-full h-[64vh] mb-4 overflow-hidden rounded-xl relative">
        <Image
          fill
          src="/beach_1.jpeg"
          alt="Beach house"
          className="object-cover w-full h-full "
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="py-6 pr-6 col-span-3">
          <h1 className="mb-4 text-4xl">Property name</h1>

          <span className="mb-6 block text-lg text-gray-600">
            4 guests - 2 bedrooms - 1 bathroom
          </span>

          <hr />

          <div className="py-6 flex items-center space-x-4">
            <Image
              src="/profile_pic_1.jpeg"
              width={50}
              height={50}
              alt="The user name"
              className="rounded-full"
            />

            <p>
              <strong>John Doe</strong> is your host
            </p>
          </div>

          <hr />

          <p className="mt-6 text-lg">
            This is a beautiful property located in the heart of the city. It
            has all the amenities you need for a comfortable stay.
          </p>
        </div>

        <ReservationSidebar />
      </div>
    </main>
  );
};

export default PropertyDetailPage;
