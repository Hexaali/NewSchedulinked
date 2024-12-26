"use client";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Tooltip,
} from "@material-tailwind/react";

export function InfoCard({ imageSrc, name, title }) {
  return (
    <Card className="items-center w-72 bg-brown-100 dark:bg-gray-700">
      <CardHeader floated={false} className="flex h-40 w-40 items-center rounded-full">
        <img className="rounded-full scale-150" src={imageSrc} alt={`${name}'s profile picture` } />
      </CardHeader>
      <CardBody className="text-center">
        <Typography variant="h5" color="blue-gray" className="mb-2 text-brown-200" textGradient>
          {name}
        </Typography>
        <Typography color="blue-gray" className="font-medium text-sm text-white italic text-justify [text-align-last:center]" textGradient>
          {title}
        </Typography>
      </CardBody>
      <CardFooter className="flex justify-center gap-7 pt-2">
        <Tooltip content="Like">
          <Typography
            as="a"
            href="#facebook"
            variant="lead"
            color="blue"
            textGradient
            >
            <i className="fab fa-facebook" />
          </Typography>
        </Tooltip>
        <Tooltip content="Follow">
          <Typography
            as="a"
            href="#twitter"
            variant="lead"
            color="light-blue"
            textGradient
            >
            <i className="fab fa-twitter" />
          </Typography>
        </Tooltip>
        <Tooltip content="Follow">
          <Typography
            as="a"
            href="#instagram"
            variant="lead"
            color="purple"
            textGradient
            >
            <i className="fab fa-instagram" />
          </Typography>
        </Tooltip>
      </CardFooter>
    </Card>
  );
}
