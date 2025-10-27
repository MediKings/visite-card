import React from 'react'
import { data } from '../../utils/data'
import './Flash.css'

const Flash = () => {
  return (
    <div className="container">
        {
            data?.map((item) => (
                <React.Fragment key={item?.id}>
                    <img src={item?.cover} style={{objectFit: 'cover', width: '100%', height: '100px'}} alt="" />
                    <img src={item?.profile} width={100} height={100} style={{objectFit: 'cover', border: '2px solid #fff', borderRadius: '50%', margin: '-40px 10px 0px'}} alt="" />
                    <div className="content">
                        <div className="infos">
                            <p><b>{item?.name}</b></p>
                            <p>{item?.email}</p>
                            <p>{item?.phone}</p>
                            <p>{item?.address}</p>
                        </div>
                        <span style={{display: 'inline-block',backgroundColor: '#000', color: '#fff', padding: '15px 25px', margin: '10px 0px', borderRadius: '10px', cursor: 'pointer'}}>Enregistrer le contact</span>
                        <div className="social">
                            <div style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
                                <span>Facebook</span>
                                <span>{item?.facebook}</span>
                            </div>
                            <div style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
                                <span>Instagram</span>
                                <span>{item?.instagram}</span>
                            </div>
                            <div style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
                                <span>Whatsapp</span>
                                <span>{item?.whatsapp}</span>
                            </div>
                            <div style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
                                <span>LinkedIn</span>
                                <span>{item?.linkedin}</span>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            ))
        }
    </div>
  )
}

export default Flash
