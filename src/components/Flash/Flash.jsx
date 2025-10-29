import { data } from '../../utils/data'
import { Link } from 'react-router-dom'
import { Mail, Map, Phone, User } from 'lucide-react'

const Flash = () => {
  return (
    <div className="container p-5">
        <h2 className='font-medium mb-3' style={{fontSize: '2rem'}}>Liste de contacts</h2>
        {
            data?.map((item) => (
                <Link to={`/${item?.id}`} key={item?.id} className=''>
                    <div className="flex items-start p-3">
                        <img src={item?.profile} style={{ width: '100px', height: '80px', objectFit: 'cover', border: '2px solid #fff', borderRadius: '20px'}} alt="" />
                        <div className="content ml-2">
                            <div className="infos">
                                <div className='flex items-center gap-3 mb-2'><User width={20} /><b>{item?.name}</b></div>
                                <div className='flex items-center gap-3 mb-2'><Mail width={18} />{item?.email}</div>
                                <div className='flex items-center gap-3 mb-2'><Phone width={18} />{item?.phone}</div>
                                <div className='flex items-center gap-3 mb-2'><Map width={18} />{item?.address}</div>
                            </div>
                        </div>
                    </div>
                </Link>
            ))
        }
    </div>
  )
}

export default Flash
