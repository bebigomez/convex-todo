import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getTasks = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("tasks").collect();
  },
});

export const addTask = mutation({
  args: {
    text: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("tasks", {
      text: args.text,
      isCompleted: false,
    });
  },
});

export const toggleTask = mutation({
  args: {
    id: v.id("tasks"),
  },
  handler: async (ctx, args) => {
    const task = await ctx.db.get(args.id);
    if (!task) return;
    await ctx.db.patch(args.id, { isCompleted: !task.isCompleted });
  },
});
