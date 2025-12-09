import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router';
import useAxios from '../../Hook/useAxios';

const ViewPage = () => {
  const { id } = useParams();
  const instance =useAxios()
  const { data: view = [] } = useQuery({
    queryKey: ['view', id],
    queryFn: async () => {
      const res = await instance.get(`/one-donationInfo/${id}`);
      return res.data
    }
  })
  return (
    <div>
      <h2>{ view?.blood_group}</h2>
    </div>
  );
};

export default ViewPage;