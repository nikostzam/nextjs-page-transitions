import React from "react";
import Link from "next/link";
import fetch from "isomorphic-unfetch";
import { motion } from "framer-motion";

let easing = [0.6, -0.05, 0.01, 0.99];

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};
const fadeInUp = {
  initial: {
    y: 100,
    opacity: 0,
    transition: { duration: 0.6, ease: easing },
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: easing,
    },
  },
};

const Product = ({ product }) => {
  if (!product) return <p>Loading...</p>;
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        className="container"
      >
        <div className="wrapper">
          <div className="left">
            <div className="product-image">
              <img className="main-image" src={product.image} alt="" />
            </div>
          </div>
          <div className="right">
            <motion.div
              animate={{ transition: { staggerChildren: 0.4 } }}
              className="right-wrapper"
            >
              <Link href="/">
                <a className="link">Back to products</a>
              </Link>
              <motion.h1
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.2 }}
              >
                {product.title}
              </motion.h1>
              <motion.p
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.3 }}
              >
                {product.description}
              </motion.p>
              <motion.div
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.4 }}
                className="qty"
              >
                <div className="minus">-</div>
                <div className="amount">1</div>
                <div className="add">+</div>
              </motion.div>
              <motion.div
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.5 }}
                className="price"
              >
                {product.price}$
              </motion.div>

              <motion.div
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.6 }}
                className="buttons"
              >
                <button>ADD TO CART</button>
                <button className="secondary">SUBSCRIBE</button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>
      <Panel />
    </>
  );
};

const Panel = () => {
  return (
    <motion.div
      initial={{ height: 0 }}
      animate={{ height: [0, 1000, 0], y: [1000, 0, 0] }}
      transition={{ times: [0, 0.3, 1], duration: 1 }}
      className="panel"
    ></motion.div>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.query;
  const res = await fetch(
    `https://my-json-server.typicode.com/nikostzam/nikostzam-api/products/${id}`
  );
  const data = await res.json();
  return {
    props: {
      product: data,
    },
  };
}

export default Product;
