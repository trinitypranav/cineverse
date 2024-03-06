const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-screen aspect-video pt-[30%] px-12 md:px-24 absolute text-white bg-gradient-to-r from-black">
      <h1 className="text-xl md:text-3xl font-bold">{title}</h1>
      <p className="hidden md:inline-block py-6 text-base text-gray-600 w-1/4">
        {overview}
      </p>
    </div>
  );
};
export default VideoTitle;
