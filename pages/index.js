import Link from 'next/link'
import { useState } from "react";
import Movie from "../models/Movies";
import mongoose from 'mongoose';
import Linkify from "react-linkify"
import { Typography,Card, CardContent, Button,Grid } from "@mui/material";

export default function Index({ products }) {
  const [showFullDesc, setShowDesc] = useState(Array(products.length).fill(false))
  
  const handleShowMoreClick = (index) => {
    const updatedShowDesc = [...showFullDesc]
    updatedShowDesc[index] = !updatedShowDesc[index]
    setShowDesc(updatedShowDesc)
  }
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <Grid container>
          {products.map((blog, index) => (
            <Grid
              key={index}
              item
              xs={12}
              lg={3}
              sx={{
                display: "flex",
                alignItems: "stretch",
              }}
            >
              <Card
                sx={{
                  p: 0,
                  width: "100%",
                }}
              >
                <img loading="lazy" className="w-full" src={blog.imageUrl} alt="img"></img>
                <CardContent
                  sx={{
                    paddingLeft: "30px",
                    paddingRight: "30px",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "h4.fontSize",
                      fontWeight: "500",
                    }}
                  >
                    {blog.title}
                  </Typography>
                  <Linkify componentDecorator={(decoratedHref, decoratedText, key) => (<a className="text-blue-800 font-medium" href={decoratedHref} key={key} target="_blank" rel="noopener noreferrer">{decoratedText}</a>)} hashtagDecorator={(decoratedText, key) => (<span key={key} className="text-blue-900 font-semibold">{decoratedText}</span>)} emailDecorator={(decoratedText, key) => (<a href={`mailto:${decoratedText}`} key={key} target="_blank" rel="noopener noreferrer">{decoratedText}</a>)}>
                    <Typography
                      color="textSecondary"
                      sx={{
                        fontSize: "14px",
                        fontWeight: "400",
                        mt: 1,
                      }}
                    >
                      {showFullDesc[index] ? blog.desc : blog.desc.substring(0, 280)}{products[index].desc.length > 279 && <button className="ml-0.5 font-bold text-gray-800" onClick={() => { handleShowMoreClick(index) }}
                      >{showFullDesc[index] ? `${" "}Show less...` : `${" "}Show more...`}
                      </button>}
                    </Typography>
                  </Linkify>
                  <Link target="_blank" href={blog.videoUrl}><Button
                    variant="contained"
                    sx={{
                      mt: "15px",
                    }}
                    color={blog.btncolor}
                  >
                    View
                  </Button></Link>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}


export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI)
  }
  let movie = await Movie.find()
  return {
    props: { products: JSON.parse(JSON.stringify(movie)) },
  }
}