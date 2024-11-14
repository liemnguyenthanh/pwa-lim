import { OGP } from "@/components/OGP";
import { Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const getBlogDetails = async (id: string) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
  const json = await res.json();

  return json;
};

const BlogPage = () => {
  const { slug } = useRouter().query;
  const [blogDetails, setBlogDetails] = useState<any>(null);

  useEffect(() => {
    if (slug) {
      getBlogDetails(slug as string).then((data) => {
        setBlogDetails(data);
        console.log(data);
      });
    }
  }, [slug]);
  return (
    <Stack p={4} spacing={2}>
      {blogDetails && (
        <>
          <OGP title={blogDetails.title} description={blogDetails.title} />
          <Typography variant="h1" color="primary">
            BlogPage {slug}
          </Typography>
          <Typography color="white">{blogDetails?.title}</Typography>
        </>
      )}
    </Stack>
  );
};

export default BlogPage;
