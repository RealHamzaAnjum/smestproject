import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signOut,
  getAdditionalUserInfo,
} from "firebase/auth";
import {
  getFirestore,
  addDoc,
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";

import {
  getDownloadURL,
  getStorage,
  listAll,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { ArticleTypes } from "./types/Types";

// Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider();

const auth = getAuth(app);

const db = getFirestore(app);
const storage = getStorage(app);

// Functions that are needed

// -----> Authentication

// -----------> 1- Functions for Login

// 1.1- Login with Email and Password
const LogInWithEmailAndPassword = async (email: string, password: string) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs?.docs?.length > 0) {
      return {
        result: "success",
        message: "Logged In Successfully",
        user: {
          profile: docs?.docs[0]?.data(),
          // auth: {
          //     accessToken: user?,
          //     refreshToken: user?.stsTokenManager?.refreshToken,
          // },
        },
      };
    }
  } catch (err: any) {
    return {
      result: "error",
      message: err.message,
      user: null,
    };
  }
};

// 1.2- Login with Google

const LogInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    // check if user exists in the database
    if (docs?.docs?.length === 0) {
      // if user does not exist in the database, then create a new user
      await addDoc(collection(db, "users"), {
        uid: user?.uid,
        fullName: user?.displayName,
        authProvider: "google",
        email: user?.email,
        profilePic: user?.photoURL,
        userRole: "customer",
      });
      // Return the user data after creating a new user
      return {
        result: "success",
        message: "Registered Successfully",
        user: {
          profile: {
            uid: user?.uid,
            fullName: user?.displayName,
            authProvider: "google",
            email: user?.email,
            profilePic: user?.photoURL,
            userRole: "customer",
          },
          // auth: {
          //     accessToken: user?.stsTokenManager?.accessToken,
          //     refreshToken: user?.stsTokenManager?.refreshToken,
          // },
        },
      };
    } else {
      // if user exists in the database, then return the user data
      return {
        result: "success",
        message: "Logged In Successfully",
        user: {
          profile: docs?.docs[0]?.data(),
          // auth: {
          //     accessToken: user?.stsTokenManager?.accessToken,
          //     refreshToken: user?.stsTokenManager?.refreshToken,
          // },
        },
      };
    }
  } catch (err: any) {
    return {
      result: "error",
      message: err.message,
      user: null,
    };
  }
};

// -----------> 2- Functions for Register

// 2.1 Register with Full Name, email, Password
const RegisterWithEmailAndPassword = async (
  fullName: string,
  email: string,
  password: string
) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      fullName: fullName,
      authProvider: "native",
      email: user.email,
      profilePic: "https://picsum.photos/500",
      userRole: "customer",
    });
    return {
      result: "success",
      message: "Registered Successfully",
      user: {
        profile: {
          uid: user.uid,
          fullName: fullName,
          authProvider: "native",
          email: user.email,
          profilePic: "https://picsum.photos/500",
          userRole: "customer",
        },
        // auth: {
        //     accessToken: user?.stsTokenManager?.accessToken,
        //     refreshToken: user?.stsTokenManager?.refreshToken,
        // },
      },
    };
  } catch (err: any) {
    return {
      result: "error",
      message: err.message,
      user: null,
    };
  }
};

// 2.2 Register with Google
const RegisterWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;

    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    // check if user exists in the database
    if (docs?.docs?.length === 0) {
      // if user does not exist in the database, then create a new user
      await addDoc(collection(db, "users"), {
        uid: user?.uid,
        fullName: user?.displayName,
        authProvider: "google",
        email: user?.email,
        profilePic: user?.photoURL,
        userRole: "customer",
      });
      // Return the user data after creating a new user
      return {
        result: "success",
        message: "Registered Successfully",
        user: {
          profile: {
            uid: user?.uid,
            fullName: user?.displayName,
            authProvider: "google",
            email: user?.email,
            profilePic: user?.photoURL,
            userRole: "customer",
          },
          //   auth: {
          //     accessToken: user?.stsTokenManager?.accessToken,
          //     refreshToken: user?.stsTokenManager?.refreshToken,
          //   },
        },
      };
    } else {
      // if user exists in the database, then return the user data
      return {
        result: "success",
        message: "Logged In Successfully",
        user: {
          profile: docs?.docs[0]?.data(),
          //   auth: {
          //     accessToken: user?.stsTokenManager?.accessToken,
          //     refreshToken: user?.stsTokenManager?.refreshToken,
          //   },
        },
      };
    }
  } catch (err: any) {
    return {
      result: "error",
      message: err.message,
      user: null,
    };
  }
};

// 3- Reset Password
const SendPasswordReset = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return {
      result: "success",
      message: "Password Reset Email Sent Successfully",
    };
  } catch (err: any) {
    return {
      result: "error",
      message: err.message,
    };
  }
};

// 4- Functions for Logout
const Logout = () => {
  signOut(auth);
};

// 5- Update User Role
const UpdateUserRole = async (user: any, role: "reader" | "admin") => {
  try {
    const signedInUserUID = auth.currentUser?.uid;

    if (signedInUserUID) {
      const res = await GetUserData(signedInUserUID);
      const isAdminUser = res.userData?.userRole === "admin";
      if (isAdminUser) {
        const docRef = doc(db, "users", user);
        await updateDoc(docRef, {
          userRole: role,
        });

        return {
          result: "success",
          message: "User Role Updated Successfully",
        };
      } else {
        return {
          result: "error",
          message: "You are not Authorized to update user's role",
        };
      }
    } else {
      return {
        result: "error",
        message: "First do Login",
      };
    }
  } catch (err: any) {
    return {
      result: "error",
      message: err.message,
    };
  }
};

// 6- Get User Data
const GetUserData = async (userUuid: string) => {
  try {
    const q = query(collection(db, "users"), where("uid", "==", userUuid));
    const docs = await getDocs(q);
    const userData = docs.docs[0].data();

    return {
      result: "success",
      message: "User data fetched Successfully",
      userData: userData,
    };
  } catch (err: any) {
    return {
      result: "error",
      message: err.message,
      userData: null,
    };
  }
};

// -----> Articles / Blogs
// 1- Gell All Articles
const GetAllArticles = async () => {
  try {
    const q = query(collection(db, "articles"));
    const docs = await getDocs(q);

    const articles = docs.docs.map((item) => item.data());
    const sortedArticles = articles.sort((a: any, b: any): number => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();

      return dateB - dateA;
    });
    return {
      result: "success",
      message: "Articles fetched Successfully",
      articles: sortedArticles,
    };
  } catch (error: any) {
    return {
      result: "error",
      message: error.message || "Something went wrong",
      articles: [],
    };
  }
};

// 2- Get Articles By Category
const GetArticlesByCategory = async (category: string) => {
  try {
    const q = query(
      collection(db, "articles"),
      where("categories", "array-contains", category.replaceAll("-", " "))
    );
    const docs = await getDocs(q);

    const articles = docs.docs.map((item) => item.data());
    const sortedArticles = articles.sort((a: any, b: any): number => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();

      return dateB - dateA;
    });
    return {
      result: "success",
      message: "Articles fetched Successfully",
      articles: sortedArticles,
    };
  } catch (error: any) {
    return {
      result: "error",
      message: error.message || "Something went wrong",
      articles: [],
    };
  }
};

// 3- Get Article by Slug
const GetArticleBySlug = async (slug: string) => {
  try {
    const q = query(collection(db, "articles"), where("slug", "==", slug));

    const docs = await getDocs(q);

    const article = docs.docs[0].data();

    return {
      result: "success",
      message: "Article fetched Successfully",
      article: article,
    };
  } catch (error: any) {
    return {
      result: "error",
      message: error.message || "Something went wrong",
      article: null,
    };
  }
};
// 3- Add new Article
const AddNewArticle = async ({
  title,
  categories,
  slug,
  shortDescription,
  coverImage,
  content,
  date,
}: ArticleTypes) => {
  try {
    const signedInUserUID = auth.currentUser?.uid;

    if (signedInUserUID) {
      const res = await GetUserData(signedInUserUID);
      const isAdminUser = res.userData?.userRole === "admin";
      if (isAdminUser) {
        await addDoc(collection(db, "articles"), {
          title: title,
          categories: categories,
          slug: slug,
          shortDescription: shortDescription,
          coverImage: coverImage,
          content: content,
          date: date,
        });

        return {
          result: "success",
          message: "Article Added Successfully",
        };
      } else {
        return {
          result: "error",
          message: "You are not Authorized to Publish Articles",
        };
      }
    } else {
      return {
        result: "error",
        message: "First do Login",
      };
    }
  } catch (error: any) {
    return {
      result: "error",
      message: error.message || "Something went wrong",
    };
  }
};
// 4- Update Article
// 5- Delete Article
const DeleteArticle = async (slug: string) => {
  try {
    const signedInUserUID = auth.currentUser?.uid;

    if (signedInUserUID) {
      const res = await GetUserData(signedInUserUID);
      const isAdminUser = res.userData?.userRole === "admin";
      if (isAdminUser) {
        const q = query(collection(db, "articles"), where("slug", "==", slug));
        const docs = await getDocs(q);

        const docRef = docs.docs[0].ref;
        await deleteDoc(docRef);

        return {
          result: "success",
          message: "Article Deleted Successfully",
        };
      } else {
        return {
          result: "error",
          message: "You are not Authorized to Delete Articles",
        };
      }
    } else {
      return {
        result: "error",
        message: "First do Login",
      };
    }
  } catch (err: any) {
    return {
      result: "error",
      message: err.message,
    };
  }
};

// -----> Gallery
// 1- Gell All Images
const GetAllImages = async () => {
  try {
    const q = query(collection(db, "images"));
    const docs = await getDocs(q);
    //  docs.docs[0].data();
    const images = docs.docs.map((item) => item.data());

    console.log("Images at firestore", images);

    return {
      result: "success",
      message: "Images data fetched Successfully",
      images: images,
    };
  } catch (error: any) {
    return {
      result: "error",
      message: error.message || "Something went wrong",
      images: [],
    };
  }
};

const SaveImageURLToDB = async (url: string, fullPath: string) => {
  const signedInUserUID = auth.currentUser?.uid;

  if (signedInUserUID) {
    const res = await GetUserData(signedInUserUID);
    const isAdminUser = res.userData?.userRole === "admin";
    if (isAdminUser) {
      await addDoc(collection(db, "images"), {
        imageUrl: url,
        fullPath: fullPath,
      });

      return {
        result: "success",
        message: "Image Added Successfully",
      };
    } else {
      return {
        result: "error",
        message: "You are not Authorized to upload images",
      };
    }
  } else {
    return {
      result: "error",
      message: "First do Login",
    };
  }
};

// 5- Delete Image

// -----> Categories
// 1- Get All Categories
const GetAllCategories = async () => {
  try {
    const q = query(collection(db, "categories"));
    const docs = await getDocs(q);
    const categories = docs.docs.map((item) => item.data());

    return {
      result: "success",
      message: "Categories data fetched Successfully",
      categories: categories,
    };
  } catch (error: any) {
    return {
      result: "error",
      message: error.message || "Something went wrong",
      categories: [],
    };
  }
};
// 2- Add new Category
const AddNewCategory = async (category: string) => {
  try {
    const signedInUserUID = auth.currentUser?.uid;

    if (signedInUserUID) {
      const res = await GetUserData(signedInUserUID);
      const isAdminUser = res.userData?.userRole === "admin";
      if (isAdminUser) {
        await addDoc(collection(db, "categories"), {
          name: category,
          slug: category.replaceAll(" ", "-"),
        });

        return {
          result: "success",
          message: "Category added Successfully",
          category: category,
        };
      } else {
        return {
          result: "error",
          message: "You are not Authorized to Publish Articles",
        };
      }
    } else {
      return {
        result: "error",
        message: "First do Login",
      };
    }
  } catch (error: any) {
    return {
      result: "error",
      message: error.message || "Something went wrong",
      category: null,
    };
  }
};

// -----> Email Subscribers
// 1- Get All Subscribers
// 2- Add new Subscriber
const AddNewSubscriber = async (email: string) => {
  try {
    const q = query(collection(db, "subscribers"), where("email", "==", email));

    const docs = await getDocs(q);

    if (docs.docs.length > 0) {
      return {
        result: "error",
        message: "Already Subscribed with this email!",
      };
    } else {
      await addDoc(collection(db, "subscribers"), {
        email: email,
      });

      return {
        result: "success",
        message: "Subscribed Successfully",
      };
    }
  } catch (error: any) {
    return {
      result: "error",
      message: error.message || "Something went wrong",
    };
  }
};
// 2- Remove Subscriber

export {
  // Auth Functions
  auth,
  LogInWithEmailAndPassword,
  LogInWithGoogle,
  RegisterWithEmailAndPassword,
  RegisterWithGoogle,
  Logout,
  UpdateUserRole,
  GetUserData,

  // Gallery Functions
  GetAllImages,
  SaveImageURLToDB,

  // Articles Functions
  GetAllArticles,
  GetArticlesByCategory,
  GetArticleBySlug,
  AddNewArticle,
  DeleteArticle,

  // Categories Functions
  GetAllCategories,
  AddNewCategory,

  // Email Subscribers Functions
  AddNewSubscriber,
};
