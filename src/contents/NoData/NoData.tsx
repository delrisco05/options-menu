import './nodataStyles.css'
import NoDataImage from '../../assets/no-data/no_data.svg';

export const NoData: React.FC = () => {
  return (
    <div className='container-nodata flex flex-col items-center justify-center text-center text-gray-500'>
      <img src={NoDataImage} alt="No data" className='mb-4' />
      <p>No hay elementos creados</p>
    </div>
  );
};
