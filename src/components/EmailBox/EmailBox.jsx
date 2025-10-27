"use client"

import React from 'react'
import './EmailBox.css'
import {LuMail} from 'react-icons/lu'
import { motion } from 'framer-motion'
import { containerVariants } from '../../utils/animation'

const EmailBox = () => {
  return (
    <motion.div 
      initial={{
        width: '0.5rem',
        borderRadius: '100%',
      }}
      whileInView={{
        width: '70%',
        borderRadius: '999px',
        transition: {
          type: 'easeOut',
          duration: 1,
        }
      }}
      className="emailBox"
    >
        <motion.div
          variants={containerVariants(0.6)}
          initial="offscreen"
          whileInView={"onscreen"}
          viewport={{
            once: true,
          }}
        >
            <LuMail size={30} color='grey' />
        </motion.div>
        <input type="email" placeholder='Entrer Votre Email' />
        <div className="getFunded">Get Funded</div>
    </motion.div>
  )
}

export default EmailBox
