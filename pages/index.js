import Link from "next/link";
import fetch from "isomorphic-unfetch";
import { motion } from "framer-motion";

const Home = ({ products }) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, delay: 0.3 }}
        className="container"
      >
        <div className="wrapper">
          <div className="left">
            <motion.h2
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -100, opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              Choose your product
            </motion.h2>
          </div>
          <div className="right">
            <div className="inner-wrapper">
              {products &&
                products.map((product) => {
                  return (
                    <Link
                      key={product.id}
                      href="/products/[id]"
                      as={`/products/${product.id}`}
                    >
                      <div className="image">
                        <motion.img
                          initial={{ y: 50, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -50, opacity: 0 }}
                          transition={{ duration: 0.4 }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.9 }}
                          src={product.image}
                        />
                      </div>
                    </Link>
                  );
                })}
            </div>
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
      animate={{ height: [0, 1000, 0], y: [0, 0, 1000] }}
      transition={{ times: [0, 0.3, 1], duration: 0.9 }}
      className="panel"
    ></motion.div>
  );
};

export async function getStaticProps() {
  const res = await fetch(
    "https://my-json-server.typicode.com/nikostzam/nikostzam-api/products"
  );
  const data = await res.json();

  return {
    props: {
      products: data,
    },
  };
}

export default Home;
