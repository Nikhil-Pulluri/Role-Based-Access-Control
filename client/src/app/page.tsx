import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen text-center flex items-center justify-center">
      <div className="space-y-4 p-3">
        <div>
          <Link href="/admin">
            <Button className="w-full">
              <span className="font-bold">Admin</span>
            </Button>
          </Link>
        </div>

        <div>
          <Link href="/employee">
            <Button className="w-full">
              <span className="font-bold">Employee</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
