import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import Slider from "react-slick";
import Skeleton from "../UI/Skeleton";
import Timer from "../UI/Timer";

const NewItems = () => {
  const [ loading, setLoading ] = useState(false)
  const [ newItemsData, setNewItemsData ] = useState([])
  async function main() {
    setLoading(true)
    const response = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems")
    setLoading(false)
    setNewItemsData(response.data)
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
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          { !loading && <Slider {...settings}>
          {newItemsData.map((newItems, index) => (
            <div className="px-2" key={index}>
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link
                    to={`/author/${newItems.authorId}`}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title={newItems.title}
                  >
                    <img className="lazy" src={newItems.authorImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                {newItems.expiryDate && <Timer expiryDate={newItems.expiryDate} />}

                <div className="nft__item_wrap">
                  <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                      <button>Buy Now</button>
                      <div className="nft__item_share">
                        <h4>Share</h4>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-facebook fa-lg"></i>
                        </a>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-twitter fa-lg"></i>
                        </a>
                        <a href="">
                          <i className="fa fa-envelope fa-lg"></i>
                        </a>
                      </div>
                    </div>
                  </div>

                  <Link to={`/item-details/${newItems.nftId}`}>
                    <img
                      src={newItems.nftImage}
                      className="lazy nft__item_preview"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to={`/item-details/${newItems.nftId}`}>
                    <h4>{newItems.title}</h4>
                  </Link>
                  <div className="nft__item_price">{newItems.price} ETH</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{newItems.likes}</span>
                  </div>
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

export default NewItems;
