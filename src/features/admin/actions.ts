"use server";

import { db } from "@/lib/db";
import { auth } from "@/lib/auth";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") throw new Error("Forbidden");
  return session;
}

export async function getAllUsers() {
  await requireAdmin();
  return db.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      image: true,
      createdAt: true,
    },
  });
}

export async function deleteUser(id: string) {
  await requireAdmin();
  return db.user.delete({ where: { id } });
}

export async function updateUserRole(id: string, role: "USER" | "ADMIN") {
  await requireAdmin();
  return db.user.update({ where: { id }, data: { role } });
}

export async function getAllLessons() {
  await requireAdmin();
  return db.lesson.findMany({
    include: { category: true, _count: { select: { exercises: true, quizzes: true, progress: true } } },
    orderBy: { createdAt: "desc" },
  });
}

export async function createLesson(data: any) {
  await requireAdmin();
  return db.lesson.create({ data });
}

export async function updateLesson(id: string, data: any) {
  await requireAdmin();
  return db.lesson.update({ where: { id }, data });
}

export async function deleteLesson(id: string) {
  await requireAdmin();
  return db.lesson.delete({ where: { id } });
}

export async function getAllBlogs() {
  await requireAdmin();
  return db.blog.findMany({
    include: { category: true, _count: { select: { blogComments: true } } },
    orderBy: { createdAt: "desc" },
  });
}

export async function createBlog(data: any) {
  await requireAdmin();
  return db.blog.create({ data });
}

export async function updateBlog(id: string, data: any) {
  await requireAdmin();
  return db.blog.update({ where: { id }, data });
}

export async function deleteBlog(id: string) {
  await requireAdmin();
  return db.blog.delete({ where: { id } });
}

export async function getAllDictionaryEntries() {
  await requireAdmin();
  return db.dictionary.findMany({
    orderBy: { word: "asc" },
  });
}

export async function createEntry(data: any) {
  await requireAdmin();
  return db.dictionary.create({ data });
}

export async function updateEntry(id: string, data: any) {
  await requireAdmin();
  return db.dictionary.update({ where: { id }, data });
}

export async function deleteEntry(id: string) {
  await requireAdmin();
  return db.dictionary.delete({ where: { id } });
}

export async function getStats() {
  await requireAdmin();
  const [users, lessons, blogs, dictionary, contacts] = await Promise.all([
    db.user.count(),
    db.lesson.count(),
    db.blog.count(),
    db.dictionary.count(),
    db.contactMessage.count(),
  ]);
  return { users, lessons, blogs, dictionary, contacts };
}
