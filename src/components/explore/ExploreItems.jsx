import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import Skeleton from "../UI/Skeleton";
import Timer from "../UI/Timer";

const ExploreItems = () => {
  const [ loading, setLoading ] = useState(false)
  const [ exploreItems, setExploreItems ] = useState([])
  const [ filteredItems, setFilteredItems ] = useState([]) 
  const [ exploreLoadItems, setExploreLoadItems ] = useState(8) 
  async function main() {
    setLoading(true)
    const response = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/explore")
    setLoading(false)
    console.log(response.data)
    setExploreItems(response.data)
    setFilteredItems(response.data)
  }

  function LoadMoreBtn() {
    setExploreLoadItems(prev => prev + 4)
  }

  function exploreFilterItems(filterType) {
    setExploreLoadItems(8)
    let sortedItems = [ ...exploreItems ]
    if (filterType === "price_low_to_high") {
      sortedItems.sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
    }
    else if (filterType === "price_high_to_low") {
      sortedItems.sort((a, b) => parseFloat(b.price) - parseFloat(a.price))
    }
    else if (filterType === "likes_high_to_low") {
      sortedItems.sort((a, b) => (a.likes) - (b.likes))
    }
    else {
      sortedItems = [ ...exploreItems ]
    }
    setFilteredItems(sortedItems)
  }


  useEffect(() => {
        main();
      }, []);

  useEffect(() => {
      window.scrollTo(0, 0);
    }, []); 

  const itemsToShow = filteredItems.slice(0, exploreLoadItems)

  return (
    <>
      <div>
        <select id="filter-items" defaultValue="" onChange={(event) => exploreFilterItems(event.target.value)}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      { !loading ? 
      itemsToShow.map((exploreData, index) => (
        <div
          key={index}
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          style={{ display: "block", backgroundSize: "cover" }}
        >
          <div className="nft__item">
            <div className="author_list_pp">
              <Link
                to={`/author/${exploreData.authorId}`}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
              >
                <img className="lazy" src={exploreData.authorImage} alt="" />
                <i className="fa fa-check"></i>
              </Link>
            </div>
            {exploreData.expiryDate && <Timer expiryDate={exploreData.expiryDate} />}

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
              <Link to={`/item-details/${exploreData.nftId}`}>
                <img src={exploreData.nftImage} className="lazy nft__item_preview" alt="" />
              </Link>
            </div>
            <div className="nft__item_info">
              <Link to="/item-details">
                <h4>{exploreData.title}</h4>
              </Link>
              <div className="nft__item_price">{exploreData.price} ETH</div>
              <div className="nft__item_like">
                <i className="fa fa-heart"></i>
                <span>{exploreData.likes}</span>
              </div>
            </div>
          </div>
        </div>
      )) : new Array(8).fill(0).map((_, index) => (
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

      { exploreLoadItems !== exploreItems.length &&
      <div className="col-md-12 text-center">
        <Link onClick={LoadMoreBtn} to="" id="loadmore" className="btn-main lead">
          Load more
        </Link>
      </div>
      }
    </>
  );
};

export default ExploreItems;
