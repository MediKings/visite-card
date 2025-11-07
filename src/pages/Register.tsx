import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import api from "../utils/axiosConfig"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { BASE_API_URL } from "../utils/constante";

// Schéma de validation Zod
const registerSchema = z.object({
  firstname: z.string()
    .min(1, "Le prénom est requis")
    .min(2, "Le prénom doit contenir au moins 2 caractères"),
  lastname: z.string()
    .min(1, "Le nom est requis")
    .min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string()
    .min(1, "L'adresse email est requise"),
  password: z.string()
    .min(6, "Le mot de passe doit contenir au moins 6 caractères")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
      message: "Le mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre"
    }),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"]
})

type RegisterFormData = z.infer<typeof registerSchema>

const Register = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema)
    })

    const onSubmit = async (data: RegisterFormData) => {
        setLoading(true);
        if (data.password !== data.confirmPassword) {
            setLoading(false);
            setMessage('Le mot de passe de confirmation est différent');
            return;
        }
        setMessage('');
        const submitData = {
            username: data.firstname.toLowerCase()+data.lastname.toLowerCase(),
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            password: data.password,
            confirmPassword: data.confirmPassword,
        };

        try {
            const response = await api.post(BASE_API_URL+"/api/auth/register", submitData)
            localStorage.setItem('user', response.data.profile);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('refreshToken', response.data.refreshToken);

            setLoading(false);
            setMessage('');
            navigate('/dashboard');
        } catch (err) {
            setLoading(false);
            setMessage('Erreur de création de compte!');
        }
    }

    const passwordValue = watch("password");

    return (
        <div className="w-screen px-3">
            <div className="border bg-white my-5 mx-auto sm:w-[25rem]">
                <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                    <div className="w-full sm:mx-auto sm:w-full sm:max-w-sm">
                        <img src="/logo.png" width={100} alt="logo ghenny" className="mx-auto" />
                        <h3 className="mt-3 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Inscrivez-vous</h3>
                    </div>
                    <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
                            {message && <div className="flex w-full justify-center rounded-md">
                                <small className='alert alert-danger p-2'>{message}</small>
                            </div>}
                            
                            <div>
                                <label htmlFor="firstname" className="block text-sm/6 font-medium text-gray-900">Prénom</label>
                                <div className="mt-2">
                                    <input 
                                        id="firstname" 
                                        type="text" 
                                        {...register("firstname")}
                                        className="block border w-full rounded-md bg-white px-2 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#30D5C8] sm:text-sm/6" 
                                        autoFocus
                                    />
                                    {errors.firstname && (
                                        <small className="text-red-500 text-xs mt-1">{errors.firstname.message}</small>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label htmlFor="lastname" className="block text-sm/6 font-medium text-gray-900">Nom</label>
                                <div className="mt-2">
                                    <input 
                                        id="lastname" 
                                        type="text" 
                                        {...register("lastname")}
                                        className="block border w-full rounded-md bg-white px-2 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#30D5C8] sm:text-sm/6" 
                                    />
                                    {errors.lastname && (
                                        <small className="text-red-500 text-xs mt-1">{errors.lastname.message}</small>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">Email</label>
                                <div className="mt-2">
                                    <input 
                                        id="email" 
                                        type="email" 
                                        {...register("email")}
                                        className="block border w-full rounded-md bg-white px-2 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#30D5C8] sm:text-sm/6" 
                                    />
                                    {errors.email && (
                                        <small className="text-red-500 text-xs mt-1">{errors.email.message}</small>
                                    )}
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">Mot de passe</label>
                                </div>
                                <div className="relative mt-2">
                                    <input 
                                        id="password" 
                                        type={showPassword ? "text" : "password"} 
                                        {...register("password")}
                                        className="block border w-full rounded-md bg-white px-2 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#30D5C8] sm:text-sm/6" 
                                    />
                                    {showPassword
                                        ? <FaRegEye onClick={()=>setShowPassword(!showPassword)} className="absolute bg-white top-3 right-2 cursor-pointer"  />
                                        : <FaRegEyeSlash onClick={()=>setShowPassword(!showPassword)} className="absolute bg-white top-3 right-2 cursor-pointer"  />
                                    }
                                </div>
                                {errors.password && (
                                    <small className="text-red-500 text-xs mt-1">{errors.password.message}</small>
                                )}
                                {/* Aide visuelle pour les règles du mot de passe */}
                                {passwordValue && (
                                    <div className="mt-1 text-xs text-gray-600">
                                        <div>Le mot de passe doit contenir :</div>
                                        <div>• Au moins 6 caractères</div>
                                        <div>• Une lettre majuscule</div>
                                        <div>• Une lettre minuscule</div>
                                        <div>• Un chiffre</div>
                                    </div>
                                )}
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="confirmPassword" className="block text-sm/6 font-medium text-gray-900">Confirmation mot de passe</label>
                                </div>
                                <div className="relative mt-2">
                                    <input 
                                        id="confirmPassword" 
                                        type={showConfirmPassword ? "text" : "password"} 
                                        {...register("confirmPassword")}
                                        className="block border w-full rounded-md bg-white px-2 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#30D5C8] sm:text-sm/6" 
                                    />
                                    {showConfirmPassword
                                        ? <FaRegEye onClick={()=>setShowConfirmPassword(!showConfirmPassword)} className="absolute bg-white top-3 right-2 cursor-pointer"  />
                                        : <FaRegEyeSlash onClick={()=>setShowConfirmPassword(!showConfirmPassword)} className="absolute bg-white top-3 right-2 cursor-pointer"  />
                                    }
                                </div>
                                {errors.confirmPassword && (
                                    <small className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</small>
                                )}
                            </div>

                            <div>
                                {
                                    loading
                                    ? <button disabled className="button-disabled flex w-full justify-center p-1" style={{border: '1px solid #ddd'}}>
                                        Chargement...
                                    </button>
                                    : <button type="submit" className="flex w-full text-gray-700 justify-center rounded-md bg-[#30D5C8] px-3 py-1.5 text-sm/6 font-semibold shadow-xs hover:bg-[#30D5C8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#30D5C8] mb-2">
                                        S'inscrire
                                    </button>
                                }
                            </div>
                        </form>
                        
                        <p className="text-center text-sm/6 text-gray-500">
                            Déjà un compte ?
                            <Link to={"/"} className="font-semibold text-[#1aaa9e] hover:text-[#1aaa9e]"> Se connecter</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register