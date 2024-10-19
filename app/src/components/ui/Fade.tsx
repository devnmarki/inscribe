type FadeType = {
  className?: string;
};

const Fade = (props: FadeType) => {
  return (
    <div
      className={`${props.className} w-full h-full absolute top-0 left-0 bg-black-1/75 z-30`}
    ></div>
  );
};

export default Fade;
