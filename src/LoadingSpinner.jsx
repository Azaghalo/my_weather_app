import { Oval } from "react-loader-spinner";

export default function LoadingSpinner(props) {
  return (
    <Oval
      height={props.size}
      width={props.size}
      wrapperStyle={{ width: "100%", display: "flex", justifyContent: "center" }}
      wrapperClass=""
      visible={true}
      ariaLabel="oval-loading"
      strokeWidth={6}
      strokeWidthSecondary={5}
      secondaryColor="#6f9de2"
      color="#3f81e4"
    />
  );
}
