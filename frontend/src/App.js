import "./App.css";
import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/api";
import { listBlogs } from "./graphql/queries.ts";
import { subscriveToLiveMessages } from "./graphql/subscriptions.ts";
import { broadcastLiveMessage } from "./graphql/mutations.ts";

const client = generateClient();

function App() {
  const [blogs, setBlogs] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // fetches all blog posts
    async function fetchBlogs() {
      const response = await client.graphql({
        query: listBlogs,
      });
      setBlogs(response.data.listBlogs.items);
    }
    fetchBlogs();

    // setup subscriptions for live chat messages
    const subscription = client.graphql({
      query: subscriveToLiveMessages
    }).subscribe(next => {
      setMessages(messages => [...messages, next.data.subscriveToLiveMessages])
    })

    return () => subscription.unsubscribe()
  }, []);

  // sends the live chat message to users
  function handleMessageSend(event) {
    if (event.key === 'Enter') {
      client.graphql({
        query: broadcastLiveMessage,
        variables: {
          message: event.target.value
        }
      })
    }
  }

  return (
    <div style={{ display: "flex", gap: 20 }}>
      <div>
        <h1>Articles</h1>
        {blogs.map((blog) => (
          <div style={{ border: '1px solid black', padding: 10, borderRadius: 10}} key={blog.id}>
            <h2>{blog.title}</h2>
            <p>{blog.content}</p>
            <p>{blog.author}</p>
            <p>{blog.createdAt}</p>
          </div>
        ))}
      </div>
      <div>
        <h1>Live chat</h1>
        <input type="text" placeholder="Hit enter to send message" onKeyDown={handleMessageSend} />
        <hr></hr>
        <ul>
          {messages.map(message => <li>{message}</li>)}
        </ul>
      </div>
    </div>
  );
}

export default App;