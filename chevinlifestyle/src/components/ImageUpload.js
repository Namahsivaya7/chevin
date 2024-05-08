// import { useEffect, useRef } from "react";

// const ImageUpload = () => {
//   const cloudinaryRef = useRef();
//   const widgetRef = useRef();
//   useEffect(() => {
//     cloudinaryRef.current = window.cloudinary;
//     widgetRef.current = cloudinaryRef.current.createUploadWidget(
//       {
//         cloudName: "dat1iodli",
//         uploadPreset: "yntjlhfj",
//       },
//       function (error, result) {
//         console.log(result);
//         console.log(error)
//       }
//     );
//   }, []);
//   return <button name="photo" onClick={() => widgetRef.current.open()}>Upload</button>;
// };

// export default ImageUpload;


import { Button, Card, Flex, theme } from "antd";
// import { CldUploadWidget } from "next-cloudinary";
import { UploadOutlined, DeleteOutlined } from "@ant-design/icons";
import { useEffect, useState,useRef } from "react";
import { Image } from "cloudinary-react";
import { getImage } from "../utils/util";
// import { getImage } from "@/utils/util";

const ImageUpload = ({
  disabled = false,
  onChange,
  value = [],
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [images, setImages] = useState(value);
  const { padding } = theme.useToken().token;

  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  useEffect(() => {
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget(
          {
            cloudName: "dat1iodli",
            uploadPreset: "yntjlhfj",
          },
          function (error, result) {
            console.log(result);
            console.log(error)
          }
          
        );
      }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onUpload = (result) => {
    console.log(result);
    const newImages = [...images, result.info.path];
    setImages(newImages);
    onChange?.(newImages);
  };

  const onRemove = (i, url) => {
    const newImages = [...images.slice(0, i), ...images.slice(i + 1)];
    setImages(newImages);
    onChange?.(newImages);
  };

  useEffect(() => {
    setImages(value);
  }, [value]);

  if (!isMounted) {
    return null;
  }

  return (
    <Flex gap={padding / 2} style={{ padding }} className="image-upload">
      {images.map((path, i) => (
        <Flex key={path} className="thumbnail">
          <Image fill alt="Image" src={getImage(path)} />
          <Button
            key="delete"
            icon={<DeleteOutlined />}
            onClick={() => onRemove(i, path)}
          ></Button>
        </Flex>
      ))}
      {/* <cloudinaryRef.current.createUploadWidget onUpload={onUpload} uploadPreset="yntjlhfj">
         {({ open }) => { 
          return ( */}
            <Flex>
              <Button
                disabled={disabled}
                icon={<UploadOutlined />}
                onClick={() =>widgetRef.current.open() }
                className="upload-btn"
              >
                Upload Image
              </Button>
            </Flex>
          {/* );
        }}
      </cloudinaryRef.current.createUploadWidget> */}
    </Flex>
  );
};

export default ImageUpload;