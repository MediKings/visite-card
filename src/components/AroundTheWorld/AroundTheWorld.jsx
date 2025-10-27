import React, { useRef } from 'react'
import './AroundTheWorld.css'
import {motion, useScroll, useTransform} from "framer-motion"
import { features, stats, logos } from '../../utils/data'
import { containerVariants, desVariants, tagVariants, titleVariants } from '../../utils/animation'

const AroundTheWorld = () => {

    const ref = useRef(null);

    const {scrollYProgress} = useScroll({
        target: ref,
        offset: ["start end", "end end"],
    })

    const scale = useTransform(scrollYProgress, [0, 1], [.6, 1])

  return (
    <div className='AroundTheWorld-wrapper'>
        {/* <div className="AroundTheWorld-container">
            <div className="AroundTheWorld-blocks">
                <motion.div 
                    initial="offscreen"
                    whileInView="onscreen"
                    variants={containerVariants(2 * 0.1)} 
                >
                    <img
                        src={'/assets/1.png'}
                        alt="feature" 
                        style={{width: "150%"}}
                    />
                </motion.div>

                <div style={{display: 'flex', flexDirection: 'column', marginLeft: '15%'}}>
                    <motion.h1
                        initial="offscreen"
                        whileInView={"onscreen"}
                        variants={titleVariants}
                        style={{fontSize: '5rem', color: 'white'}}
                    >Partout dans le monde</motion.h1>
                    <div className="block-features">
                        {
                            stats.map((stat, i)=>(
                                <motion.div 
                                    initial="offscreen"
                                    whileInView="onscreen"
                                    variants={containerVariants((i+1) * 0.1)} 
                                    className='block-feature' 
                                    key={i}
                                >
                                    <h3 style={{fontSize: '2.5rem', color: 'white'}}>{stat.continent}</h3>
                                    <span style={{fontSize: '1.5rem', color: 'white'}}>{stat.sieges} sieges</span>
                                </motion.div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div> */}

        
        <h1 style={{textAlign: "center", color: "white", fontSize: '7rem'}}>Partout dans le monde</h1>
        <img
            src={'/assets/1.png'}
            alt="feature" 
            style={{width: '80vw', display: 'block', margin: '0px auto'}}
        />
        <div className="block-features" style={{padding: '0px 5%'}}>
            {
                stats.map((stat, i)=>(
                    <motion.div 
                        initial="offscreen"
                        whileInView="onscreen"
                        variants={containerVariants((i+1) * 0.1)} 
                        className='block-feature' 
                        key={i}
                    >
                        <h3 style={{fontSize: '3.5rem', color: 'white'}}>{stat.continent}</h3>
                        <span style={{fontSize: '2.5rem', color: 'white'}}>{stat.sieges} sieges</span>
                    </motion.div>
                ))
            }
        </div>
    </div>
  )
}

export default AroundTheWorld
