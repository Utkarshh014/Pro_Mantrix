import MemberModel from "../models/member.model";

export const getCurrentUserService = async (userId: string) => {
  const user = await UserModel.findById(userId)
    .populate("currentWorkspace")
    .select("-password");

  if (!user) {
    throw new BadRequestException("User not found");
  }

  if (user.currentWorkspace) {
    const workspaceId = (user.currentWorkspace as any)._id;
    const isMember = await MemberModel.exists({
      userId,
      workspaceId,
    });

    if (!isMember) {
       // Auto-heal: User is not a member of their current workspace.
       // Find another workspace they are a member of.
       const member = await MemberModel.findOne({ userId }).sort({ joinedAt: -1 });
       if (member) {
         user.currentWorkspace = member.workspaceId;
         await user.save();
       } else {
         user.currentWorkspace = null;
         await user.save();
       }
    }
  }

  return {
    user,
  };
};
