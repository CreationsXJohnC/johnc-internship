import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import axios from "axios";
import Skeleton from "../UI/Skeleton";

const TopSellers = () => {
    const [ loading, setLoading ] = useState(false)
    const [ topSellersData, setTopSellersData ] = useState([])
    async function main() {
      setLoading(true)
      const response = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers")
      setLoading(false)
      console.log(response.data)
      setTopSellersData(response.data)
    }
  
    useEffect(() => {
        main();
      }, []);


  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">
              { topSellersData.map((topSellers, index) => (
                <li key={index}>
                  <div className="author_list_pp">
                    <Link to={`/author/${topSellers.authorId}`}>
                      <img
                        className="lazy pp-author"
                        src={topSellers.authorImage}
                        alt=""
                      />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="author_list_info">
                    <Link to={`/author/${topSellers.authorId}`}>{topSellers.authorName}</Link>
                    <span>{topSellers.price} ETH</span>
                  </div>
                </li>
              ))}
              { loading && new Array(12).fill(0).map((_, index) => (
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
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
