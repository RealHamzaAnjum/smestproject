"use client";
import ArticleCard from "@/components/Dashboard/ArticleCard";
import ArticleForm from "@/components/Dashboard/ArticleForm";
import Link from "next/link";
import React, { useRef, useState, useEffect } from "react";
import { ArticleTypes } from "@/utils/types/Types";
import { GetAllArticles, DeleteArticle } from "@/utils/firebase";
import { toast } from "react-hot-toast";
import LoadingIndicator from "@/components/LoadingIndicator";
import { IoIosClose, IoMdImages } from "react-icons/io";
import Gallery from "@/components/Dashboard/Gallery";

type Artilce = {
  title: string;
  coverImage: string;
  categories: string[];
  shortDescription: string;
  slug: string;
  date: string;
};

function DashboardArticles() {
  const [search, setSearch] = useState("");
  const [selectedArticle, setSelectedArticle] = useState<ArticleTypes | null>(
    null
  );
  const [articles, setArticles] = useState<ArticleTypes[] | any[]>([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deletingArticle, setDeletingArticle] = useState(false);
  const [showAddNewArticleForm, setShowAddNewArticleForm] = useState(false);
  const [showEditArticleForm, setShowEditArticleForm] = useState(false);
  const [fetchingArticles, setFetchingArticles] = useState(false);

  const DeleteArticleDialogRef = useRef<HTMLDialogElement>(null);
  const GalleryBottomDialogRef = useRef<HTMLDialogElement>(null);
  const [showBottomGallery, setShowBottomGallery] = useState(false);

  const deleteArticle = async () => {
    if (selectedArticle) {
      setDeletingArticle(true);
      const res = await DeleteArticle(selectedArticle?.slug);
      console.log(res);
      if (res.result === "success") {
        setDeletingArticle(false);
        DeleteArticleDialogRef.current?.close();
        toast.success("Article Deleted");
        fetchAllArticles();
      } else {
        setDeletingArticle(false);
        toast.error(res.message || "Something went wrong");
      }
    } else {
      setDeletingArticle(false);
      DeleteArticleDialogRef.current?.close();
    }
  };

  const fetchAllArticles = async () => {
    setFetchingArticles(true);

    const res = await GetAllArticles();

    if (res.result === "success") {
      setArticles(res.articles);
      setFetchingArticles(false);
    } else if (res.result === "error") {
      setArticles([]);
      toast.error(res.message);
      setFetchingArticles(false);
    }
  };

  useEffect(() => {
    fetchAllArticles();
  }, []);

  return (
    <section className="relative px-20">
      {!showAddNewArticleForm && !showEditArticleForm && (
        <section>
          <section className="mt-5">
            <h1 className="text-2xl font-semibold my-3">All Articles</h1>
            <section className="flex flex-wrap justify-between items-center">
              <label htmlFor="search" className="relative ">
                <input
                  type="search"
                  name="search"
                  id="search"
                  className="bg-transparent border border-black/30 dark:border-white/30 outline-none px-4 py-2 rounded-lg w-96 text-lg"
                  placeholder="Search Article"
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
              </label>

              <button
                className="py-2.5 px-5 me-2 mb-2 text-base font-medium text-light-bg dark:text-dark-bg focus:outline-none bg-light-primary dark:bg-dark-primary rounded-lg"
                onClick={() => {
                  setShowAddNewArticleForm(true);
                }}
              >
                Add New Article
              </button>
            </section>
          </section>

          <section className="mt-8 grid grid-cols-3 gap-5 h-fit">
            {articles
              .filter((article) =>
                article?.title?.toLowerCase()?.includes(search?.toLowerCase())
              )
              .map((article, index) => {
                return (
                  <ArticleCard
                    key={index}
                    title={article.title}
                    categories={article.categories}
                    coverImage={article.coverImage}
                    shortDescription={article.shortDescription}
                    slug={article.slug}
                    date={article.date}
                    showDeleteAlert={() => {
                      setSelectedArticle(article);
                      DeleteArticleDialogRef.current?.showModal();
                    }}
                    showEditForm={() => {
                      setSelectedArticle(article);
                      setShowEditArticleForm(true);
                    }}
                  />
                );
              })}
            {!fetchingArticles &&
              articles.filter((article) =>
                article?.title?.toLowerCase()?.includes(search?.toLowerCase())
              ).length === 0 && (
                <section className="col-span-full">
                  <p>
                    No artilce found{" "}
                    {search.length > 0 && (
                      <span>matching &quot;{search}&quot;</span>
                    )}
                  </p>
                </section>
              )}
            {fetchingArticles && (
              <section className="col-span-full pt-20">
                <LoadingIndicator showText text="Fetching Articles" />
              </section>
            )}
          </section>
        </section>
      )}

      {/* Add New Article Form */}
      {showAddNewArticleForm && (
        <section>
          <ArticleForm
            formType="AddNew"
            hideForm={() => {
              setShowAddNewArticleForm(false);
              fetchAllArticles();
            }}
          />
        </section>
      )}

      {/* Edit Article Form */}
      {showEditArticleForm && selectedArticle && (
        <section>
          <ArticleForm
            formType="Edit"
            articleData={{
              title: selectedArticle.title,
              categories: selectedArticle.categories,
              content: selectedArticle.content,
              coverImage: selectedArticle.coverImage,
              shortDescription: selectedArticle.shortDescription,
              date: selectedArticle.date,
              slug: selectedArticle.slug,
            }}
            hideForm={() => {
              setShowEditArticleForm(false);
              fetchAllArticles();
            }}
          />
        </section>
      )}

      {/* Delete Article Dialog */}
      <dialog
        id="deleteArticleDialog"
        ref={DeleteArticleDialogRef}
        className="w-full max-w-sm rounded-2xl py-10 px-8 bg-white"
      >
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-lg font-semibold text-center">
            Are you sure that you want to delete this article?
          </h2>
          <div className="flex justify-center items-center">
            <button
              className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-700 disabled:cursor-not-allowed"
              onClick={() => {
                DeleteArticleDialogRef.current?.close();
              }}
              disabled={deletingArticle}
            >
              Cancel
            </button>
            <button
              className="focus:outline-none text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 disabled:cursor-not-allowed"
              onClick={() => {
                deleteArticle();
              }}
              disabled={deletingArticle}
            >
              {deletingArticle ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </dialog>

      {(showAddNewArticleForm || showEditArticleForm) && (
        <button
          className="fixed bottom-5 right-5 w-10 h-10 bg-black dark:bg-white rounded-full flex items-center justify-center"
          onClick={() => {
            setShowBottomGallery(true);
            GalleryBottomDialogRef.current?.showModal();
          }}
        >
          <IoMdImages className="text-2xl text-white dark:text-black" />
        </button>
      )}
      {/* Gallery Dialog */}
      <dialog
        ref={GalleryBottomDialogRef}
        className="w-full max-w-4xl rounded-2xl bg-white"
      >
        <section className="relative py-5 px-5 w-full">
          <p className="text-center text-xl font-bold">
            Upload Or Select from existing
          </p>
          <button
            className="absolute top-3 right-3 w-7 h-7 aspect-square rounded-full border-2 border-black text-black flex justify-center items-center"
            onClick={() => {
              GalleryBottomDialogRef.current?.close();
              setShowBottomGallery(false);
            }}
          >
            <IoIosClose className="text-3xl" />
          </button>
          {showBottomGallery && (
            <Gallery
              type="component"
              actionAfterImageSelect={(imageLink) => {
                GalleryBottomDialogRef.current?.close();
                setShowBottomGallery(false);
              }}
            />
          )}
        </section>
      </dialog>
    </section>
  );
}

export default DashboardArticles;
