import './Images.css';


function Images() {
  const images = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <div className='imagesContainer'>
      {images.map((image) =>
        <div className='imageBox clickable'>{image}</div>)}
    </div>
  )
}

export default Images;
