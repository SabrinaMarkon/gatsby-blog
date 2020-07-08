import React from "react";
import { Link, graphql } from "gatsby";
import "bootstrap/dist/css/bootstrap.css";
import "../pages/index.css";

import Layout from "../components/layout";
import SEO from "../components/seo";
import Sidebar from "../components/sidebar/Sidebar";
import TechTag from "../components/tags/TechTag";

const PostList = (props) => {
  const posts = props.data.allMarkdownRemark.edges;
  const labels = props.data.site.siteMetadata.labels;
  const { currentPage, numPages } = props.pageContext;
  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;
  const prevPage = currentPage - 1 === 1 ? "/" : (currentPage - 1).toString();
  const nextPage = (currentPage + 1).toString();

  const getTechTags = (tags) => {
    const techTags = [];
    tags.forEach((tag, i) => {
      labels.forEach((label) => {
        if (tag === label.tag) {
          techTags.push(
            <TechTag
              key={i}
              tag={label.tag}
              tech={label.tech}
              name={label.name}
              size={label.size}
              color={label.color}
            />
          );
        }
      });
    });
    return techTags;
  };

  return (
    <Layout>
      <SEO
        title="Home"
        keywords={[
          `gatsby`,
          `javascript`,
          `react`,
          `web development`,
          `blog`,
          `graphql`,
        ]}
      />
      <div className="index-main">
        <div className="sidebar px-3">
          <Sidebar />
        </div>
        <div className="post-list-main">
          {posts.map((post) => {
            const tags = post.node.frontmatter.tags;
            return (
              <div key={post.node.id} className="container mt-5">
                <Link to={post.node.fields.slug} className="text-dark">
                  <h2 className="title">{post.node.frontmatter.title}</h2>
                </Link>
                <small className="d-block text-info">
                  <i>Posted on {post.node.frontmatter.date}</i>
                </small>
                <p className="mt-3 d-inline">{post.node.excerpt}</p>
                <Link to={post.node.fields.slug} className="text-primary">
                  <small className="d-inline-block ml-3"> Read full post</small>
                </Link>
                <div className="d-block">{getTechTags(tags)}</div>
              </div>
            );
          })}
          <div className="text-center my-4">
            <ul style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', listStyle: 'none', padding: '0'}}>
              {!isFirst && (
                <li className='pagenum'>
                  <Link
                    to={prevPage}
                    rel="prev"
                    className="pagenum-link"
                  >
                    ← Previous Page
                  </Link>
                </li>
              )}
              {Array.from({ length: numPages }, (_, i) => (
                <li className='pagenum'>
                  <Link
                    key={`pagination-number${i + 1}`}
                    to={`/${i === 0 ? "" : i + 1}`}
                    className="pagenum-link"
                  >
                    {i + 1}
                  </Link>
                </li>
              ))}
              {!isLast && (
                <li className='pagenum'>
                  <Link
                    to={nextPage}
                    rel="next"
                    className="pagenum-link"
                  >
                    Next Page →
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const listQuery = graphql`
  query paginateQuery($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
        author
        labels {
          tag
          tech
          name
          size
          color
        }
      }
    }
    allMarkdownRemark(
      limit: $limit
      skip: $skip
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { published: { eq: true } } }
    ) {
      totalCount
      edges {
        node {
          excerpt(pruneLength: 200)
          html
          id
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            tags
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;

export default PostList;
