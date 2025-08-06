import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import Slider from "react-slick";
import Skeleton from "../UI/Skeleton";

const HotCollections = () => {
  const [ loading, setLoading ] = useState(false)
  const [ hotCollectionsData, setHotCollectionsData ] = useState([])
  async function main() {
    setLoading(true)
    const response = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections")
    setLoading(false)
    setHotCollectionsData(response.data)
  }

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  }


  useEffect(() => {
    main();
  }, []);

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container" data-aos="fade-down">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          { !loading && <Slider {...settings}>
          { hotCollectionsData.map((hotCollection, index) => (
            <div className="px-2" key={index}>
              <div className="nft_coll">
                <div className="nft_wrap">
                  <Link to={`/item-details/${hotCollection.nftId}`}>
                    <img src={hotCollection.nftImage} className="lazy img-fluid" alt="" />
                  </Link>
                </div>
                <div className="nft_coll_pp">
                  <Link to={`/author/${hotCollection.authorId}`}>
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
          </Slider> }
          { loading && new Array(4).fill(0).map((_, index) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
            <div className="nft_coll">
              <div className="nft_wrap">
                <Skeleton width="100%" height="100%" />
              </div>
              <div className="nft_coll_pp">
                <Skeleton width="60px" height="60px" borderRadius="50%" />
                <i className="fa fa-check"></i>
              </div>
              <div className="nft_coll_info">
                <h4><Skeleton height="20px" width="40%" /></h4>
                <Skeleton height="20px" width="20%" />
              </div>
            </div>
          </div>
          )) }
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
