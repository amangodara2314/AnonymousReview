import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Copy, CheckIcon } from "lucide-react";

export function GeneratedLinkDialog({
  generatedLink,
  coppied,
  copyLink,
  setGeneratedLink,
}) {
  return (
    <Dialog
      open={generatedLink !== ""}
      onOpenChange={(isOpen) => {
        if (!isOpen) setGeneratedLink("");
      }}
    >
      <DialogContent className="bg-zinc-950 border-zinc-800">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-white">
            Your Generated Link
          </DialogTitle>
        </DialogHeader>
        <div className="flex items-center space-x-4 mt-4">
          <Input
            readOnly
            value={generatedLink}
            className="bg-black border-zinc-800 text-white"
          />
          <Button
            onClick={() => copyLink(generatedLink)}
            variant="outline"
            size="icon"
            disabled={coppied === generatedLink}
            className={"text-white"}
          >
            {coppied === generatedLink ? (
              <CheckIcon className="h-5 w-5" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
