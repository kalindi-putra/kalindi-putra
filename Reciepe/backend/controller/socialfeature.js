const exp=require('express')
const router=exp.Router()
const auth=require('../util/auth')




router.post('/users/:userId/follow',auth, async (req, res) => {
    const { userId } = req.params;
    const followerId = req.user.id; // Assuming authenticated user ID
  
    try {
      // Check if user exists and is not self
      if (userId === followerId) {
        return res.status(400).json({ message: "You can't follow yourself" });
      }
  
      const userToFollow = await User.findById(userId);
      const followerUser = await User.findById(followerId);
  
      if (!userToFollow || !followerUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Check if already following
      if (userToFollow.followers.includes(followerId)) {
        return res.status(400).json({ message: 'You are already following this user' });
      }
  
      // Update follower and following arrays
      userToFollow.followers.push(followerId);
      followerUser.following.push(userId);
  
      // Save updated users
      await userToFollow.save();
      await followerUser.save();
  
      res.status(201).json({ message: 'User followed successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // GET endpoint to fetch activity feed for current user (from users they follow)
router.get('/users/activity-feed', auth,async (req, res) => {
    const userId = req.user.id; // Assuming authenticated user ID
  
    try {
      // Find users that the current user follows
      const currentUser = await User.findById(userId).populate('following', 'username');
  
      if (!currentUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Fetch activities (e.g., new recipes, reviews) from users the current user follows
      const activityFeed = await Promise.all(
        currentUser.following.map(async (user) => {
          const activities = await Recipe.find({ createdBy: user._id }).limit(5); // Example: Fetch latest recipes by followed users
          return { user: user.username, activities };
        })
      );
  
      res.json(activityFeed);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  