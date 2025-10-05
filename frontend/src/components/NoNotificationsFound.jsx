import { BellIcon } from "lucide-react";

function NoNotificationsFound() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="size-16 rounded-full bg-base-300 flex items-center justify-center mb-4">
        <BellIcon className="size-8 text-base-content opacity-40" />
      </div>
      <h3 className="text-lg font-semibold mb-2">还没有通知</h3>
      <p className="text-base-content opacity-70 max-w-md">
        当您收到好友请求或消息时，它们会出现在这里。
      </p>
    </div>
  );
}

export default NoNotificationsFound;
