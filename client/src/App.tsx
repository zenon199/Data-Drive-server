import { Button } from "./components/Button"
import { Card } from "./components/Card"
import { PlusIcon } from "./icons/PlusIcon"
import { ShareIcon } from "./icons/ShareIcon"

function App() {
  return (
      <div>
      <Button varient="primary" text="Add content" startIcon={<PlusIcon />} />
      <Button varient="secondary" text="Share Brain" startIcon={<ShareIcon />} />
      <Card title="Youtube" link="" type="youtube" />
      </div>
  )
}

export default App