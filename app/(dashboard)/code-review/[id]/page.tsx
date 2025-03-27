import {
  ArrowLeft,
  Check,
  Code,
  Copy,
  FileCode,
  GitBranch,
  GitPullRequest,
  MessageSquare,
  Share2,
  ThumbsUp,
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function CodeReviewDetailPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch the code review data based on the ID
  const reviewId = params.id

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center mb-6">
        <Link href="/code-review" className="mr-4">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <div className="flex items-center">
            <h1 className="text-3xl font-bold">Code Review Request</h1>
            <Badge className="ml-3">Open</Badge>
          </div>
          <p className="text-gray-500 dark:text-gray-400">PR #42: Implement user authentication with JWT</p>
        </div>
        <div className="ml-auto flex space-x-2">
          <Button variant="outline" size="icon">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4 mb-6">
                <Avatar className="h-12 w-12">
                  <AvatarImage src="/placeholder.svg?height=40&width=40&text=AK" alt="@user" />
                  <AvatarFallback>AK</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-2xl font-bold">Implement user authentication with JWT</h2>
                  <div className="flex items-center mt-2 text-sm text-gray-500">
                    <span className="font-medium text-primary">Alex Kim</span>
                    <span className="mx-2">•</span>
                    <span>Requested 1 day ago</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                <Badge>Authentication</Badge>
                <Badge>JWT</Badge>
                <Badge>Node.js</Badge>
                <Badge>Express</Badge>
              </div>

              <div className="prose dark:prose-invert max-w-none mb-6">
                <p>
                  I've implemented user authentication using JWT tokens as discussed in our planning meeting. The
                  implementation includes:
                </p>
                <ul>
                  <li>User registration and login endpoints</li>
                  <li>JWT token generation and validation</li>
                  <li>Password hashing with bcrypt</li>
                  <li>Middleware for protected routes</li>
                  <li>Refresh token mechanism</li>
                </ul>
                <p>
                  I'm particularly looking for feedback on the token refresh strategy and the error handling approach.
                  Also, I'm not sure if the current implementation follows best security practices.
                </p>
              </div>

              <Tabs defaultValue="changes">
                <TabsList className="mb-4">
                  <TabsTrigger value="changes">Changes</TabsTrigger>
                  <TabsTrigger value="discussion">Discussion</TabsTrigger>
                </TabsList>
                <TabsContent value="changes">
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold">auth.controller.js</h3>
                        <Button variant="ghost" size="sm">
                          <Copy className="h-4 w-4 mr-1" />
                          Copy
                        </Button>
                      </div>
                      <div className="bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden">
                        <div className="flex items-center justify-between p-2 bg-gray-200 dark:bg-gray-700 text-sm">
                          <span>Added file</span>
                          <span>+78 lines</span>
                        </div>
                        <pre className="p-4 text-sm overflow-x-auto">
                          <code>
                            {`const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user.model');

// User registration
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Create new user
    const user = new User({
      username,
      email,
      password: hashedPassword
    });
    
    await user.save();
    
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// User login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    // Generate tokens
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);
    
    // Save refresh token
    user.refreshToken = refreshToken;
    await user.save();
    
    res.status(200).json({
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};`}
                          </code>
                        </pre>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold">auth.middleware.js</h3>
                        <Button variant="ghost" size="sm">
                          <Copy className="h-4 w-4 mr-1" />
                          Copy
                        </Button>
                      </div>
                      <div className="bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden">
                        <div className="flex items-center justify-between p-2 bg-gray-200 dark:bg-gray-700 text-sm">
                          <span>Added file</span>
                          <span>+45 lines</span>
                        </div>
                        <pre className="p-4 text-sm overflow-x-auto">
                          <code>
                            {`const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};

exports.refreshToken = async (req, res) => {
  const { refreshToken } = req.body;
  
  if (!refreshToken) {
    return res.status(401).json({ message: 'Refresh token is required' });
  }
  
  try {
    // Find user with this refresh token
    const user = await User.findOne({ refreshToken });
    if (!user) {
      return res.status(403).json({ message: 'Invalid refresh token' });
    }
    
    // Verify refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    
    // Generate new access token
    const accessToken = generateAccessToken(decoded.id);
    
    res.status(200).json({ accessToken });
  } catch (error) {
    return res.status(403).json({ message: 'Invalid refresh token' });
  }
};`}
                          </code>
                        </pre>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="discussion">
                  <div className="space-y-6">
                    {[1, 2].map((i) => (
                      <div key={i} className="flex items-start gap-4 pb-6 border-b">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={`/placeholder.svg?height=40&width=40&text=U${i}`} alt="@user" />
                          <AvatarFallback>U{i}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center">
                            <h4 className="font-medium">Emily Chen</h4>
                            <span className="text-xs text-gray-500 ml-2">12 hours ago</span>
                          </div>

                          <div className="prose dark:prose-invert max-w-none text-sm mt-2">
                            <p>The implementation looks good overall! A few suggestions:</p>
                            <ol>
                              <li>
                                Consider adding rate limiting to prevent brute force attacks on the login endpoint.
                              </li>
                              <li>
                                The refresh token mechanism is good, but you might want to implement token rotation for
                                better security.
                              </li>
                              <li>Add validation for the request body in both registration and login endpoints.</li>
                            </ol>
                            <p>
                              Also, I noticed that you're storing the refresh token in the user document. This is fine,
                              but you might want to consider using a separate collection for refresh tokens with an
                              expiration date.
                            </p>
                          </div>

                          <div className="flex items-center gap-4 mt-4">
                            <Button variant="ghost" size="sm" className="flex items-center gap-1">
                              <ThumbsUp className="h-4 w-4" />
                              <span>5</span>
                            </Button>
                            <Button variant="ghost" size="sm">
                              Reply
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}

                    <div>
                      <textarea
                        className="w-full p-3 border rounded-md dark:bg-gray-800 min-h-[120px]"
                        placeholder="Add your comment..."
                      ></textarea>
                      <div className="flex justify-end mt-4">
                        <Button>Post Comment</Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardContent className="p-6">
              <h3 className="font-bold mb-4">Review Status</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Status</span>
                  <Badge>Open</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Requested By</span>
                  <span className="text-sm font-medium">Alex Kim</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Requested On</span>
                  <span className="text-sm font-medium">June 15, 2023</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Comments</span>
                  <span className="text-sm font-medium">8</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Files Changed</span>
                  <span className="text-sm font-medium">4</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t space-y-4">
                <Button className="w-full" variant="default">
                  <Check className="mr-2 h-4 w-4" />
                  Approve
                </Button>
                <Button className="w-full" variant="outline">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Request Changes
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardContent className="p-6">
              <h3 className="font-bold mb-4">Reviewers</h3>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={`/placeholder.svg?height=32&width=32&text=R${i}`} alt="@user" />
                        <AvatarFallback>R{i}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium text-sm">Emily Chen</span>
                    </div>
                    {i === 1 ? (
                      <Badge
                        variant="outline"
                        className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 border-green-200 dark:border-green-800"
                      >
                        Approved
                      </Badge>
                    ) : i === 2 ? (
                      <Badge
                        variant="outline"
                        className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-100 border-yellow-200 dark:border-yellow-800"
                      >
                        Requested Changes
                      </Badge>
                    ) : (
                      <Badge
                        variant="outline"
                        className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-700"
                      >
                        Pending
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                Add Reviewer
              </Button>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardContent className="p-6">
              <h3 className="font-bold mb-4">Repository Info</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <FileCode className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">backend-api</span>
                </div>
                <div className="flex items-center gap-2">
                  <GitBranch className="h-4 w-4 text-primary" />
                  <span className="text-sm">feature/user-auth → main</span>
                </div>
                <div className="flex items-center gap-2">
                  <GitPullRequest className="h-4 w-4 text-primary" />
                  <span className="text-sm">PR #42</span>
                </div>
                <div className="flex items-center gap-2">
                  <Code className="h-4 w-4 text-primary" />
                  <span className="text-sm">4 files changed, 156 additions, 12 deletions</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

