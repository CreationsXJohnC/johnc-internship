import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import Slider from "react-slick";

const HotCollections = () => {
  const [ hotCollectionsData, setHotCollectionsData ] = useState([])
  async function main() {
    const response = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections")
    console.log(response.data)
    setHotCollectionsData(response.data)
  }

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  }

  useState(() => )

  useEffect(() => {
    main();
  }, []);

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <Slider {...settings}>
          { hotCollectionsData.map((hotCollection, index) => (
            <div className="px-2" key={index}>
              <div className="nft_coll">
                <div className="nft_wrap">
                  <Link to="/item-details">
                    <img src={hotCollection.nftImage} className="lazy img-fluid" alt="" />
                  </Link>
                </div>
                <div className="nft_coll_pp">
                  <Link to="/author">
                    <img className="lazy pp-coll" src={hotCollection.authorImage} alt="" />
                  </Link>
                  <i className="fa fa-check"></i>
                </div>
                <div className="nft_coll_info">
                  <Link to="/explore">
                    <h4>{hotCollection.title}</h4>
                  </Link>
                  <span>ERC-{hotCollection.code}</span>
                </div>
              </div>
            </div>
          ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
