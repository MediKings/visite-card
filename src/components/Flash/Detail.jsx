import { data } from '../../utils/data'
import { Link, useParams } from 'react-router-dom'
import { Mail, Map, Phone, Smartphone, User } from 'lucide-react'

const Detail = () => {
    const {id} = useParams();
    const item = data.find(d=>d.id===id)
  return (
    <div className="container">
        <div>
            <img src={item?.cover} style={{objectFit: 'cover', width: '100%', height: '100px'}} alt="" />
            <img src={item?.profile} style={{ width: '120px', height: '120px', objectFit: 'cover', border: '2px solid #fff', borderRadius: '50%', margin: '-40px 10px 0px'}} alt="" />
            <div className="content">
                <div className="infos ml-4 mt-3">
                    <div className='flex items-center gap-3 mb-2'><User width={20} /><b>{item?.name}</b></div>
                    <div className='flex items-center gap-3 mb-2'><Mail width={18} />{item?.email}</div>
                    <div className='flex items-center gap-3 mb-2'><Phone width={18} />{item?.phone}</div>
                    <div className='flex items-center gap-3 mb-2'><Map width={18} />{item?.address}</div>
                </div>
                <span style={{display: 'inline-block',backgroundColor: '#000', color: '#fff', padding: '15px 25px', margin: '10px', borderRadius: '30px', cursor: 'pointer'}}>Enregistrer le contact</span>
                <div className="social ml-4">
                    <div className='flex items-center gap-3 mb-2'>
                        <Smartphone width={20} />
                        <Link to={item?.facebook}>Facebook</Link>
                    </div>
                    <div className='flex items-center gap-3 mb-2'>
                        <Smartphone width={20} />
                        <Link to={item?.instagram}>Instagram</Link>
                    </div>
                    <div className='flex items-center gap-3 mb-2'>
                        <Smartphone width={20} />
                        <Link to={item?.whatsapp}>Whatsapp</Link>
                    </div>
                    <div className='flex items-center gap-3 mb-2'>
                        <Smartphone width={20} />
                        <Link to={item?.linkedin}>LinkedIn</Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Detail
