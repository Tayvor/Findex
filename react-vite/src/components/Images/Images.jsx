import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetImages } from '../../redux/images';
import './Images.css';


function Images() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(thunkGetImages())
  }, [dispatch]);

  const images = Object.values(useSelector((state) => state.images));

  return (
    <div className='imagesContainer'>
      {images.map((image) =>
        <img
          src={image.url}
          key={`img${image.id}`}
          // style={{ 'width': 100, 'height': 100 }}
          className='imageBox clickable'
        />
      )}
    </div>
  )
}

export default Images;
