import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import React, { Fragment, memo, useEffect, useState } from "react";
import {
  Control,
  Controller,
  UseFormSetValue,
  useWatch,
} from "react-hook-form";
import { useParams } from "react-router-dom";
import { Label } from "../ui/label";
import { Skeleton } from "../ui/skeleton";
import RHFInputLabel from "./RHFInputLabel";

interface RHFInputFileProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
  isLoading?: boolean;
  isMulti?: boolean;
  type?: string;
  control: Control<any>;
  setValue: UseFormSetValue<any>;
}

function RHFInputFile({
  name,
  setValue,
  label,
  className,
  isLoading,
  isMulti = false,
  control,
  type,
  ...other
}: RHFInputFileProps) {
  const [files, setFiles] = useState<File[]>([]);
  const { id } = useParams();

  const watchedValue = useWatch({ control, name });

  useEffect(() => {
    if (id && !isLoading && watchedValue != undefined) {
      setFiles([watchedValue]);
    }
  }, [id, isLoading, watchedValue]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles([...files, ...Array.from(event.target.files)]);
    }
  };

  const handleDeleteImg = (fileToDelete: File | string) => {
    console.log(fileToDelete);
    setFiles((prevFiles) => prevFiles.filter((file) => file !== fileToDelete));
    if (files.length == 1) {
      setValue(name, undefined);
    }
  };

  return (
    <div className={cn("flex flex-col gap-4 mb-6 ", className)}>
      <div className=" relative py-2 px-5 text-center">
        <RHFInputLabel label={label as string} />
        {isLoading && <Skeleton className="h-[235px]" />}
        {!isLoading && files.length == 0 && (
          <Fragment>
            <Label
              htmlFor={name}
              className="absolute duration-150 left-0 opacity-5 w-full h-[calc(100%-1.5rem)] cursor-pointer"
            />
            <div className="flex gap-4 ">
              <Controller
                control={control}
                name={name}
                render={({ field, fieldState: { error } }) => {
                  const handleFileChange = (
                    event: React.ChangeEvent<HTMLInputElement>
                  ) => {
                    if (event.target.files) {
                      setFiles([...files, ...Array.from(event.target.files)]);
                      field.onChange(event.target.files[0]);
                    }
                  };

                  return (
                    <div
                      className={`gap-4 flex flex-col justify-center items-center border border-gray-200 rounded-xl p-6 w-full`}
                    >
                      <div className="shadow-2xs bg-Base-White border border-gray-200 rounded-md flex justify-center items-center p-2.5 w-10 h-10">
                        <img
                          src={"/assets/upload-cloud.svg"}
                          alt={"upload"}
                          className="flex items-center justify-center"
                        />
                      </div>
                      <div className="flex flex-col items-center justify-center w-full">
                        <div className="flex justify-center items-center gap-1 w-full">
                          <p className="text-primary flex items-center justify-center  font-semibold">
                            Click to upload{" "}
                          </p>

                          <div>
                            <input
                              {...other}
                              name={name}
                              id={name}
                              type="file"
                              multiple={isMulti}
                              accept="image/*"
                              onChange={handleFileChange}
                              className="hidden cursor-pointer w-full h-full"
                            />
                          </div>
                        </div>
                        <p className="text-gray-600 font-sm leadig-5 w-full flex justify-center items-center">
                          SVG, PNG, JPG or GIF (max. 800X400px)
                        </p>
                      </div>
                      <p className="text-sm font-medium text-red-500  text-start mt-1">
                        {error?.message}
                      </p>
                    </div>
                  );
                }}
              ></Controller>
            </div>
          </Fragment>
        )}
        {!!files.length && !isLoading && (
          <>
            <Label
              htmlFor={name}
              className="absolute z-5 duration-150 left-0 opacity-5 w-full h-[calc(100%-1.5rem)] cursor-pointer"
            />
            <div className="border border-gray-200 rounded-xl p-4 flex flex-wrap gap-3 ">
              {files?.map((file) => (
                <div
                  key={
                    typeof file === "string"
                      ? file
                      : typeof file !== "undefined"
                      ? file.name
                      : undefined
                  }
                  className="flex-1 first:h-80 h-[300px] relative min-w-[300px] first:min-w-full"
                >
                  <X
                    className="absolute right-1 top-1 z-999 text-red-600 cursor-pointer"
                    onClick={handleDeleteImg.bind(null, file)}
                  />
                  <img
                    src={
                      typeof file === "string"
                        ? file
                        : typeof file !== "undefined"
                        ? URL.createObjectURL(file)
                        : undefined
                    }
                    alt="Product Image"
                    className="rounded-xl w-full m-auto object-cover first:h-60 h-full"
                  />
                </div>
              ))}
              <div>
                <input
                  {...other}
                  name={name}
                  id={name}
                  type="file"
                  multiple={isMulti}
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden cursor-pointer w-full h-full"
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default memo(RHFInputFile);
