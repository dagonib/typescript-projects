import { Badge, Button, Card, TextInput, Title } from "@tremor/react";
import { useUserActions } from '../hooks/useUserActions'
import { useState } from "react";

export function CreateNewUser () {
    const { addUser } = useUserActions()
    const [result, setResult] = useState<'ok' | 'ko' | null>(null)

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        
        setResult(null)
        const form = event.target as HTMLFormElement
        const formData = new FormData(form)

        const name = formData.get('name') as string
        const email = formData.get('email') as string
        const github = formData.get('github') as string

        if (!name || !email || !github) {
            return setResult('ko')
        }

        addUser({ name, email, github})
        setResult('ok')
        form.reset()
    }

    return (
        <Card style={{ marginTop: '16px' }}>
           <Title>Create New User</Title>

           <form onSubmit={handleSubmit} className="">
               <TextInput
                    name="name"
                    placeholder="Nombre"
               /> 
               <TextInput 
                    name="email"
                    placeholder="Email"
               />
               <TextInput
                    name="github"
                    placeholder="GitHub"
               />

               <div>
                    <Button
                        type="submit"
                        style={{ marginTop: '16px' }}
                    >
                        Crear Usuario
                    </Button>
                    {result === 'ok' && (
                        <Badge color='slate'>Guardado correctamente</Badge>
                    )}
                    {result === 'ko' && <Badge>Error con los campos</Badge>}
               </div>
           </form>
        </Card>
    )
}