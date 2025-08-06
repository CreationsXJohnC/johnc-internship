import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";

const Author = () => {
  const [ loading, setLoading ] = useState(false)
  const [ authorData, setAuthorData ] = useState([])
  const {authorId} = useParams() 
  async function main() {
    setLoading(true)
    const response = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`)
    setLoading(false)
    setAuthorData(response.data)
  }

useEffect(() => {
        main();
      }, []);

      
  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content" data-aos="fade-down">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <img src={authorData.authorImage} alt="" />

                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {authorData.authorName}
                          <span className="profile_username">{authorData.tag}</span>
                          <span id="wallet" className="profile_wallet">
                            {authorData.address}
                          </span>
                          <button id="btn_copy" title="Copy Text">
                            Copy
                          </button>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="profile_follower">{authorData.followers} followers</div>
                      <Link to="#" className="btn-main">
                        Follow
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems />
                </div>
              </div>
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
      </div>
    </div>
  );
};

export default Author;
