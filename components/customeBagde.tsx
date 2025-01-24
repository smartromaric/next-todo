import { Badge } from "../components/ui/badge";


interface Props {
    completed:Boolean
}

export default  function CustomeBagde({completed}:Props) {
    return (
      completed === true? <Badge className="bg-purple-500 hover:bg-purple-600" variant={"default"}  >Vrai</Badge>
        :<Badge className="bg-gray-500">Faux</Badge>
    )
  }