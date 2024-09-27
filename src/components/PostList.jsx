import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Copy, CheckIcon } from "lucide-react";
import Link from "next/link";

export function PostList({ posts, BASE_URL, coppied, copyLink, isActive }) {
  return (
    <Card className="bg-zinc-950 border-zinc-800 w-full sm:w-[80%] lg:w-1/2 text-white">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">Previous Posts</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!posts || posts.length === 0 ? (
          <div className="text-sm text-zinc-500">No Post Found!</div>
        ) : (
          posts.map((post) => (
            <div
              key={post.id}
              className="flex items-center justify-between p-4 bg-black rounded-lg"
            >
              <div className="w-[60%]">
                <h3 className="font-medium truncate">{post.title}</h3>
                <p className="text-sm text-zinc-400">
                  {BASE_URL + "/" + post._id}
                </p>
              </div>
              <div className="space-x-2">
                <Switch
                  checked={post.isActive}
                  onCheckedChange={(e) => isActive(e, post._id)}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={coppied === BASE_URL + "/" + post._id}
                  onClick={() => copyLink(BASE_URL + "/" + post._id)}
                >
                  {coppied === BASE_URL + "/" + post._id ? (
                    <CheckIcon className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
                <Button>
                  <Link
                    className={"w-full h-full"}
                    href={"/dashboard/post/" + post._id}
                  >
                    View Reviews
                  </Link>
                </Button>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
