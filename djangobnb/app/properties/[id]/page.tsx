import Image from "next/image";
import ReservationSidebar from "../../components/properties/ReservationSidebar";

import apiService from "../../services/apiService";
import { getUserId } from "../../lib/actions";
import Link from "next/link";

const PropertyDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const property = await apiService.get(`/api/properties/${id}`);
  const userId = await getUserId();

  return (
    <main className="max-w-375 mx-auto px-6 pb-6">
      <div className="w-full h-[64vh] mb-4 overflow-hidden rounded-xl relative">
        <Image
          fill
          src={property.image_url}
          alt="Beach house"
          className="object-cover w-full h-full "
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="py-6 pr-6 col-span-3">
          <h1 className="mb-4 text-4xl">{property.title}</h1>

          <span className="mb-6 block text-lg text-gray-600">
            {property.guests} guests - {property.bedrooms} bedrooms -{" "}
            {property.bathrooms} bathroom
          </span>

          <hr />

          <Link
            href={`/landlords/${property.landlord.id}`}
            className="py-6 flex items-center gap-3"
          >
            <div className="relative w-20 h-20 shrink-0">
              <Image
                src={property.landlord.avatar_url}
                fill
                alt="Host"
                className="rounded-full object-cover"
              />
            </div>

            <p>
              <strong>{property.landlord.name}</strong> is your host
            </p>
          </Link>

          <hr />

          <p className="mt-6 text-lg">{property.description}</p>
        </div>

        <ReservationSidebar property={property} userId={userId} />
      </div>
    </main>
  );
};

export default PropertyDetailPage;
