interface IProps {
  imageSrc: string;
  alt: string;
  className?: string;
}

const Image = ({ imageSrc, alt, className }: IProps) => {
  return (
    <div>
      <img src={imageSrc} alt={alt} className={className} />
    </div>
  );
};

export default Image;
