import { useNavigate, useParams } from '@remix-run/react';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import EditRestaurantForm from '~/components/admin/edit/EditRestaurantForm';
import { ROUTE_PATHS } from '~/constants/pathname';
import { SERVICE_KEY } from '~/constants/service';
import { useGetRestaurant, usePutRestaurant } from '~/services/restaurant/restaurant_queries';

const Page = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  if (!id) {
    throw new Error('restaurant id is missing');
  }

  const queryClient = useQueryClient();

  const [payload, setPayload] = useState<IPostRestaurant>({
    name: '',
    address: '',
    email: '',
    description: '',
    is_only_course: false,
    tel: '',
    reservation_url: '',
    tags: [],
    launch_price: 0,
    dinner_price: 0,
    currency: 'won',
  });

  const { data, refetch } = useGetRestaurant(id);
  const { mutateAsync: putRestaurant } = usePutRestaurant();

  const editRestaurant = async () => {
    await putRestaurant({ ...payload, id, status: 'active' });
    await queryClient.invalidateQueries({ queryKey: [SERVICE_KEY.RESTAURANT.GET_RESTAURANTS] });
    await refetch();
    navigate(`${ROUTE_PATHS.ADMIN.LIST}`);
  };

  useEffect(() => {
    if (!data) return;
    setPayload({ ...data });
  }, [data]);

  return <EditRestaurantForm key={id} payload={payload} setPayload={setPayload} editRestaurant={editRestaurant} />;
};

export default Page;
